import { supabase } from '@/services/supabaseService'

type CreateUserData = {
    email: string
    password: string
    user_name: string
    user_last_name: string
    dni: string
    role: string
}

type UpdateUserData = {
    user_name?: string
    user_last_name?: string
    email?: string
    is_active?: boolean
    role?: string
}

export const createUser = async (userData: CreateUserData) => {
    try {
        const { data, error } = await supabase.functions.invoke('create-user', {
            body: userData,
        })

        if (error) {
            return {
                error: {
                    message: error.message || 'Error connecting to the server',
                },
            }
        }

        return { data }
    } catch (error) {
        console.error('Error in createUser:', error)
        return {
            error: {
                message: 'Error connecting to the server',
            },
        }
    }
}

export const resetPassword = async (userEmail: string) => {
    try {
        const { data, error } = await supabase.functions.invoke(
            'reset-password',
            {
                body: { userEmail },
            }
        )

        if (error) {
            return {
                error: {
                    message: error.message || 'Error connecting to the server',
                },
            }
        }

        return { data }
    } catch (error) {
        console.error('Error in resetPassword:', error)
        return {
            error: {
                message: 'Error connecting to the server',
            },
        }
    }
}

export const updateUser = async (userId: string, userData: UpdateUserData) => {
    try {
        const { data, error } = await supabase.functions.invoke('admin-users', {
            body: {
                action: 'update',
                userId,
                userData,
            },
        })

        if (error) {
            return {
                error: {
                    message: error.message || 'Error connecting to the server',
                },
            }
        }

        return { data }
    } catch (error) {
        console.error('Error in updateUser:', error)
        return {
            error: {
                message: 'Error connecting to the server',
            },
        }
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const { data, error } = await supabase.functions.invoke('admin-users', {
            body: {
                action: 'delete',
                userId,
            },
        })

        if (error) {
            return {
                error: {
                    message: error.message || 'Error connecting to the server',
                },
            }
        }

        return { data }
    } catch (error) {
        console.error('Error in deleteUser:', error)
        return {
            error: {
                message: 'Error connecting to the server',
            },
        }
    }
}
