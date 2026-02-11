// import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getListPatients } from '@/resources/patient/services/patient.service'
import { fhirToPatient } from '@resources/patient/domain/patient.adapter'

export const usePatients = () => {
    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ['listPatients'],
        queryFn: () => getListPatients(),
        select: (data) => data.map(fhirToPatient),
    })

    return {
        patients: data,
        isPending: isPending,
        isError: isError,
        error: error,
        refetch: refetch,
    }
}

// export const usePatientsNames = () => {
//     const { patients } = usePatients()

//     const patientsData = useMemo(() => {
//         return (
//             patients?.map((item) => ({
//                 name: `${item.name[0].given} ${item.name[0].family}`,
//                 id: item.id,
//             })) ||
//             .sort((a, b) => a.name.localeCompare(b.name)) || []
//             []
//         )
//     }, [patients])

//     return patientsData
// }
