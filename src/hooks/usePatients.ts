import { useQuery } from '@tanstack/react-query'
import { getListPatients } from '@services/supabaseService'

export const usePatients = () => {
    const {
        data: patientsData,
        isPending: patientsLoading,
        isError: patientsError,
        error: patientsErrorType,
        refetch: userRefetch,
    } = useQuery({
        queryKey: ['listPatients'],
        queryFn: () => getListPatients(),
    })

    return {
        patients: patientsData,
        isPending: patientsLoading,
        isError: patientsError,
        error: patientsErrorType,
        refetch: userRefetch,
    }
}
