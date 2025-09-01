import { supabase } from '@/services/supabaseService'

type CreateUserData = {
    email: string
    password: string
    user_name: string
    user_last_name: string
    dni: string
    role: string
}

export const createUser = async (userData: CreateUserData) => {
    try {
        const {
            data: { session },
            error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError || !session) {
            return {
                error: {
                    message:
                        "You don't have an active session. Please sign in.",
                },
            }
        }

        const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-user`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify(userData),
            }
        )

        const responseData = await response.json()
        return { data: responseData }
    } catch (error) {
        console.error('Error in createUser:', error)
        return {
            error: {
                message: 'Error connecting to the server',
            },
        }
    }
}
