import { useQuery } from '@tanstack/react-query'
import { getClinicalHistory } from '@services/supabaseService'

export const useClinicalHistory = () => {
    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ['listClinicalHistory'],
        queryFn: () => getClinicalHistory(),
    })

    return {
        clinicalHistory: data,
        isPending: isPending,
        isError: isError,
        error: error,
        refetch: refetch,
    }
}
