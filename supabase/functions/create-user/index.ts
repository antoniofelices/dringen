import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: 'Missing authorization header' }),
                {
                    status: 401,
                    headers: {
                        ...corsHeaders,
                        'Content-Type': 'application/json',
                    },
                }
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
            return new Response(
                JSON.stringify({ error: 'Invalid or expired token' }),
                {
                    status: 401,
                    headers: {
                        ...corsHeaders,
                        'Content-Type': 'application/json',
                    },
                }
            )
        }

        // const { data: currentUser, error: profileError } = await supabaseClient
        //     .from('medical_user')
        //     .select('role')
        //     .eq('id', user.id)
        //     .single()

        // if (profileError || currentUser?.role !== 'admin') {
        //     return new Response(
        //         JSON.stringify({ error: 'Forbidden - Admin role required' }),
        //         {
        //             status: 403,
        //             headers: {
        //                 ...corsHeaders,
        //                 'Content-Type': 'application/json',
        //             },
        //         }
        //     )
        // }

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
            return new Response(
                JSON.stringify({
                    error: 'Missing required fields: email, password, user_name, user_last_name, dni',
                }),
                {
                    status: 400,
                    headers: {
                        ...corsHeaders,
                        'Content-Type': 'application/json',
                    },
                }
            )
        }

        const { data: existingUser } = await supabaseAdmin
            .from('medical_user')
            .select('email')
            .eq('email', email)
            .single()

        if (existingUser) {
            return new Response(
                JSON.stringify({
                    error: 'User with this email already exists',
                }),
                {
                    status: 409,
                    headers: {
                        ...corsHeaders,
                        'Content-Type': 'application/json',
                    },
                }
            )
        }

        const { data: existingDni } = await supabaseAdmin
            .from('medical_user')
            .select('dni')
            .eq('dni', dni)
            .single()

        if (existingDni) {
            return new Response(
                JSON.stringify({ error: 'User with this DNI already exists' }),
                {
                    status: 409,
                    headers: {
                        ...corsHeaders,
                        'Content-Type': 'application/json',
                    },
                }
            )
        }

        const { data: authUser, error: authError } =
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

        if (authError || !authUser?.user?.id) {
            return new Response(
                JSON.stringify({
                    error: `Failed to create auth user: ${authError?.message}`,
                }),
                {
                    status: 400,
                    headers: {
                        ...corsHeaders,
                        'Content-Type': 'application/json',
                    },
                }
            )
        }

        const { data: userData, error: insertError } = await supabaseAdmin
            .from('medical_user')
            .insert({
                id: authUser.user.id,
                user_name,
                user_last_name,
                dni,
                email,
                role,
            })
            .select()
            .single()

        if (insertError) {
            await supabaseAdmin.auth.admin.deleteUser(authUser.user.id)

            return new Response(
                JSON.stringify({
                    error: `Failed to create user profile: ${insertError.message}`,
                }),
                {
                    status: 500,
                    headers: {
                        ...corsHeaders,
                        'Content-Type': 'application/json',
                    },
                }
            )
        }

        return new Response(
            JSON.stringify({
                message: 'User created successfully',
                user: {
                    id: userData.id,
                    email: userData.email,
                    user_name: userData.user_name,
                    user_last_name: userData.user_last_name,
                    dni: userData.dni,
                    role: userData.role,
                },
            }),
            {
                status: 201,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        )
    } catch (error) {
        console.error('Error in create-user function:', error)
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        )
    }
})
