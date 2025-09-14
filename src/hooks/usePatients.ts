import { useQuery } from '@tanstack/react-query'
import { getPatients } from '@services/supabaseService'

export const usePatients = () => {
    const {
        data: patientsData,
        isPending: patientsLoading,
        isError: patientsError,
        error: patientsErrorType,
        refetch: userRefetch,
    } = useQuery({
        queryKey: ['listPatients'],
        queryFn: () => getPatients(),
    })

    return {
        patients: patientsData,
        isPending: patientsLoading,
        isError: patientsError,
        error: patientsErrorType,
        refetch: userRefetch,
    }
}
