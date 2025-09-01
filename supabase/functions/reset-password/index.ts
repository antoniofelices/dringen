import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'authorization, x-client-info, apikey, content-type',
    'X-RateLimit-Limit': '5',
    'X-RateLimit-Window': '3600',
    'X-RateLimit-Policy': '5;w=3600',
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

        const { userEmail } = await req.json()

        const { error } = await supabaseAdmin.auth.admin.generateLink({
            type: 'recovery',
            email: userEmail,
            options: {
                redirectTo: `${Deno.env.get('APP_URL')}/reset-password`,
            },
        })

        if (error) throw error

        return createResponse({
            success: true,
            message: 'Email sent successfully',
        }, 201)
    } catch (error) {
        return createResponse({ 
            error: 'Failed to send reset email. Please try again.' 
        }, 400)
    }
})
