import { supabase } from '@/services/supabaseService'

interface CreateUserData {
    email: string
    password: string
    user_name: string
    user_last_name: string
    dni: string
    role: string
}

export const createUser = async (userData: CreateUserData) => {
    try {
        // 1. Obtener el token del usuario actual
        const {
            data: { session },
            error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError || !session) {
            return {
                error: {
                    message:
                        'No tienes una sesión activa. Por favor, inicia sesión.',
                },
            }
        }

        // 2. Llamar a la Edge Function con el token de autorización
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

        if (!response.ok) {
            console.error('Error response:', responseData)
            return {
                error: {
                    message: responseData.error || 'Error al crear el usuario',
                },
            }
        }

        return { data: responseData }
    } catch (error) {
        console.error('Error in createUser:', error)
        return {
            error: {
                message: 'Error de conexión al servidor',
            },
        }
    }
}
