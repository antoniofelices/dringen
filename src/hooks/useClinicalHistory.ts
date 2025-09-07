import { useQuery } from '@tanstack/react-query'
import { getListAllClinicalHistory } from '@services/supabaseService'

export const useClinicalHistory = () => {
    const {
        data: clinicalHistoryData,
        isPending: clinicalHistoryLoading,
        isError: clinicalHistoryError,
        error: clinicalHistoryErrorType,
        refetch: userRefetch,
    } = useQuery({
        queryKey: ['listClinicalHistory'],
        queryFn: () => getListAllClinicalHistory(),
    })

    return {
        clinicalHistory: clinicalHistoryData,
        isPending: clinicalHistoryLoading,
        isError: clinicalHistoryError,
        error: clinicalHistoryErrorType,
        refetch: userRefetch,
    }
}
