import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE, OPTIONS',
    'X-RateLimit-Limit': '20',
    'X-RateLimit-Window': '3600',
    'X-RateLimit-Policy': '20;w=3600',
}

const createResponse = (data: any, status: number = 200) => {
    return new Response(JSON.stringify(data), {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            return createResponse(
                { error: 'Missing authorization header' },
                401
            )
        }

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_ANON_KEY')!
        )

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        )

        const token = authHeader.replace('Bearer ', '')
        const {
            data: { user },
            error: userError,
        } = await supabaseClient.auth.getUser(token)

        if (userError || !user) {
            return createResponse({ error: 'Invalid or expired token' }, 401)
        }

        const { data: currentUserProfile } = await supabaseAdmin
            .from('medical_user')
            .select('role')
            .eq('id', user.id)
            .single()

        if (!currentUserProfile || currentUserProfile.role !== 'admin') {
            return createResponse(
                {
                    error: 'Insufficient permissions. Only admin users can manage users.',
                },
                403
            )
        }

        const body = await req.json()
        const { action, userId, userData } = body

        if (!action) {
            return createResponse(
                { error: 'Missing required field: action' },
                400
            )
        }

        if (action === 'update') {
            if (!userId) {
                return createResponse(
                    { error: 'Missing required field: userId' },
                    400
                )
            }

            if (!userData || Object.keys(userData).length === 0) {
                return createResponse(
                    { error: 'Missing required field: userData' },
                    400
                )
            }

            const allowedFields = [
                'user_name',
                'user_last_name',
                'email',
                'is_active',
                'role',
            ]
            const updateData: any = {}

            for (const [key, value] of Object.entries(userData)) {
                if (allowedFields.includes(key)) {
                    updateData[key] = value
                }
            }

            if (Object.keys(updateData).length === 0) {
                return createResponse(
                    {
                        error: 'No valid fields to update. Allowed fields: user_name, user_last_name, email, is_active',
                    },
                    400
                )
            }

            const { data: existingUser } = await supabaseAdmin
                .from('medical_user')
                .select('id, email')
                .eq('id', userId)
                .single()

            if (!existingUser) {
                return createResponse({ error: 'User not found' }, 404)
            }

            if (updateData.email && updateData.email !== existingUser.email) {
                const { data: emailExists } = await supabaseAdmin
                    .from('medical_user')
                    .select('id')
                    .eq('email', updateData.email)
                    .neq('id', userId)
                    .single()

                if (emailExists) {
                    return createResponse(
                        {
                            error: 'Email already exists for another user',
                        },
                        409
                    )
                }

                try {
                    const { error: authUpdateError } =
                        await supabaseAdmin.auth.admin.updateUserById(userId, {
                            email: updateData.email,
                        })

                    if (authUpdateError) {
                        return createResponse(
                            {
                                error: `Failed to update auth email: ${authUpdateError.message}`,
                            },
                            400
                        )
                    }
                } catch (authError) {
                    return createResponse(
                        {
                            error: 'Failed to update user authentication email',
                        },
                        500
                    )
                }
            }

            const { data: updatedUser, error: updateError } =
                await supabaseAdmin
                    .from('medical_user')
                    .update(updateData)
                    .eq('id', userId)
                    .select(
                        'id, email, user_name, user_last_name, is_active, role'
                    )
                    .single()

            if (updateError) {
                return createResponse(
                    {
                        error: `Failed to update user: ${updateError.message}`,
                    },
                    400
                )
            }

            return createResponse({
                message: 'User updated successfully',
                user: updatedUser,
            })
        } else if (action === 'delete') {
            if (!userId) {
                return createResponse(
                    { error: 'Missing required field: userId' },
                    400
                )
            }

            if (userId === user.id) {
                return createResponse(
                    {
                        error: 'Cannot delete your own account',
                    },
                    400
                )
            }

            const { data: existingUser } = await supabaseAdmin
                .from('medical_user')
                .select('id, role')
                .eq('id', userId)
                .single()

            if (!existingUser) {
                return createResponse({ error: 'User not found' }, 404)
            }

            try {
                const { error: authDeleteError } =
                    await supabaseAdmin.auth.admin.deleteUser(userId)

                if (authDeleteError) {
                    return createResponse(
                        {
                            error: `Failed to delete user authentication: ${authDeleteError.message}`,
                        },
                        400
                    )
                }

                const { error: profileDeleteError } = await supabaseAdmin
                    .from('medical_user')
                    .delete()
                    .eq('id', userId)

                if (profileDeleteError) {
                    console.error(
                        'Profile deletion failed after auth deletion:',
                        {
                            userId,
                            error: profileDeleteError.message,
                        }
                    )
                    return createResponse(
                        {
                            error: 'User authentication deleted but profile cleanup failed. Please contact administrator.',
                        },
                        500
                    )
                }

                return createResponse({
                    message: 'User deleted successfully',
                    deletedUserId: userId,
                })
            } catch (deleteError) {
                console.error('Error during user deletion:', deleteError)
                return createResponse(
                    {
                        error: 'Failed to delete user. Please try again.',
                    },
                    500
                )
            }
        } else {
            return createResponse(
                {
                    error: 'Invalid action. Supported actions: update, delete',
                },
                400
            )
        }
    } catch (error) {
        console.error('Error in admin-users function:', error)
        return createResponse({ error: 'Internal server error' }, 500)
    }
})
