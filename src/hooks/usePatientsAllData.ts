import { useQuery } from '@tanstack/react-query'
import { getListAllDataPatients } from '@services/supabaseService'

export const usePatientsAllData = () => {
    const {
        data: patientsData,
        isPending: patientsLoading,
        isError: patientsError,
        error: patientsErrorType,
        refetch: userRefetch,
    } = useQuery({
        queryKey: ['listHealthConsumers'],
        queryFn: () => getListAllDataPatients(),
    })

    return {
        patients: patientsData,
        isPending: patientsLoading,
        isError: patientsError,
        error: patientsErrorType,
        refetch: userRefetch,
    }
}
