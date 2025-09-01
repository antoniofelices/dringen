import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@hooks/useAuth'
import { getSingleUser } from '@/services/supabaseService'

export const useCurrentUser = () => {
    const { user: authUser, loading: authLoading } = useAuth()

    const {
        data: userData,
        isPending: userLoading,
        isError: userError,
        error: userErrorType,
    } = useQuery({
        queryKey: ['currentUser', authUser?.id],
        queryFn: () => getSingleUser(authUser!.id),
        enabled: !!authUser && !authLoading,
        staleTime: 300000,
    })

    return {
        user: userData,
        authUser,
        isPending: authLoading || userLoading,
        isError: userError,
        error: userErrorType,
        isAuthenticated: !!authUser,
    }
}
