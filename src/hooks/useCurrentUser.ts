import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@hooks/useAuth'
import { getSingleUser } from '@/services/supabaseService'

export const useCurrentUser = () => {
    const { user: authUser, loading: authLoading } = useAuth()

    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ['currentUser', authUser?.id],
        queryFn: () => getSingleUser(authUser!.id),
        enabled: !!authUser && !authLoading,
        staleTime: 300000,
    })

    return {
        user: data,
        authUser,
        isPending: authLoading || isPending,
        isError: isError,
        error: error,
        refetch: refetch,
        isAuthenticated: !!authUser,
    }
}
