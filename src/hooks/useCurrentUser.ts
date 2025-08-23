import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@hooks/useAuth'
import { getSingleUser } from '@/services/supabaseService'

export const useCurrentUser = () => {
    const { user, loading: authLoading } = useAuth()

    const {
        data,
        isLoading: userDataLoading,
        error,
    } = useQuery({
        queryKey: ['singleUser', user?.id],
        queryFn: () => getSingleUser(user!.id),
        enabled: !!user,
    })

    return {
        user,
        userData: data,
        loading: authLoading || userDataLoading,
        error,
        isAuthenticated: !!user,
    }
}
