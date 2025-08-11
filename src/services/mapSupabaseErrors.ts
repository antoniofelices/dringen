const mapSupabaseError = (errorMessage: string) => {
    const lowerMessage = errorMessage.toLowerCase()

    if (lowerMessage.includes('invalid login credentials')) {
        return {
            field: 'root' as const,
            message: 'Email o contraseña incorrectos',
        }
    }

    if (lowerMessage.includes('email not confirmed')) {
        return {
            field: 'email' as const,
            message: 'Por favor confirma tu email antes de iniciar sesión',
        }
    }

    if (lowerMessage.includes('too many requests')) {
        return {
            field: 'root' as const,
            message: 'Demasiados intentos. Intenta de nuevo más tarde',
        }
    }

    return {
        field: 'root' as const,
        message: errorMessage,
    }
}

export default mapSupabaseError
