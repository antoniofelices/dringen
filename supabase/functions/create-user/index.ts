import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'authorization, x-client-info, apikey, content-type',
    'X-RateLimit-Limit': '10',
    'X-RateLimit-Window': '3600',
    'X-RateLimit-Policy': '10;w=3600',
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
            return createResponse({ error: 'Missing authorization header' }, 401)
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

        const body = await req.json()
        const {
            email,
            password,
            user_name,
            user_last_name,
            dni,
            role = 'user',
        } = body

        if (!email || !password || !user_name || !user_last_name || !dni) {
            return createResponse({
                error: 'Missing required fields: email, password, user_name, user_last_name, dni',
            }, 400)
        }

        const { data: existingUser } = await supabaseAdmin
            .from('medical_user')
            .select('email')
            .eq('email', email)
            .single()

        if (existingUser) {
            return createResponse({
                error: 'User with this email already exists',
            }, 409)
        }

        const { data: existingDni } = await supabaseAdmin
            .from('medical_user')
            .select('dni')
            .eq('dni', dni)
            .single()

        if (existingDni) {
            return createResponse({ error: 'User with this DNI already exists' }, 409)
        }

        let authUser: any = null
        
        try {
            const { data: authUserData, error: authError } =
                await supabaseAdmin.auth.admin.createUser({
                    email,
                    password,
                    email_confirm: true,
                    user_metadata: {
                        user_name,
                        user_last_name,
                        dni,
                        role,
                        created_by: user.id,
                    },
                })

            if (authError || !authUserData?.user?.id) {
                return createResponse({
                    error: `Failed to create auth user: ${authError?.message}`,
                }, 400)
            }

            authUser = authUserData

            const { data: userData, error: updateError } = await supabaseAdmin
                .from('medical_user')
                .update({
                    user_name,
                    user_last_name,
                    dni,
                    email,
                    role,
                })
                .eq('id', authUser.user.id)
                .select()
                .single()

            if (updateError) {
                throw new Error(`Profile update failed: ${updateError?.message || JSON.stringify(updateError)}`)
            }

            return createResponse({
                message: 'User created successfully',
                user: {
                    id: userData.id,
                    email: userData.email,
                    user_name: userData.user_name,
                    user_last_name: userData.user_last_name,
                    dni: userData.dni,
                    role: userData.role,
                },
            }, 201)

        } catch (transactionError) {
            if (authUser?.user?.id) {
                try {
                    await supabaseAdmin.auth.admin.deleteUser(authUser.user.id)
                } catch (rollbackError) {
                    console.error('Rollback failed - manual cleanup required:', {
                        authUserId: authUser.user.id,
                        rollbackError: rollbackError.message,
                        originalError: transactionError.message
                    })
                    
                    return createResponse({
                        error: 'User creation failed and cleanup incomplete. Please contact administrator.',
                    }, 500)
                }
            }

            return createResponse({
                error: 'Failed to create user. Please try again.',
            }, 500)
        }
    } catch (error) {
        console.error('Error in create-user function:', error)
        return createResponse({ error: 'Internal server error' }, 500)
    }
})
