import { useQuery } from '@tanstack/react-query'
import { getListPatients, getSinglePatientById } from '@/resources/patient/services/patient.service'
import { fhirToPatient } from '@resources/patient/domain/patient.adapter'

export const useSinglePatient = (patientId: string) => {
    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ['singlePatient', patientId],
        queryFn: () => getSinglePatientById(patientId),
        select: fhirToPatient,
        enabled: !!patientId,
    })

    return {
        patient: data,
        isPending,
        isError,
        error,
        refetch,
    }
}

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
