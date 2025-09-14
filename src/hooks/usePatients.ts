import { useMemo } from 'react'
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

export const usePatientsNames = () => {
    const { patients } = usePatients()

    const patientsData = useMemo(() => {
        return (
            patients
                ?.map((item) => ({
                    name: `${item.user_last_name} ${item.user_name}`,
                    id: item.id,
                    dni: item.dni,
                }))
                .sort((a, b) => a.name.localeCompare(b.name)) || []
        )
    }, [patients])

    return patientsData
}
