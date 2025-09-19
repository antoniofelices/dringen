type SupabaseError = {
    field: 'root' | 'email'
    message: string
}

const mapSupabaseError = (errorMessage: string): SupabaseError => {
    const message = errorMessage.toLowerCase()
    return {
        field: 'root',
        message: message,
    }
}

export default mapSupabaseError
