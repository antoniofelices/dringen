import { useAuthContext } from '@auth/hooks/useAuthContext'

export const useAuth = () => {
    return useAuthContext()
}
