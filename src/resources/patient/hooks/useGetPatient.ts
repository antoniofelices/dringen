import { useQuery } from '@tanstack/react-query'
import {
    getListPatients,
    getPatientsByPractitioner,
    getSinglePatientById,
} from '@resources/patient/services/patient.service'
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

export const usePatientsByPractitioner = (practitionerId: string) => {
    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ['listPatientsByPractitioner', practitionerId],
        queryFn: () => getPatientsByPractitioner(practitionerId),
        select: (data) => data.map(fhirToPatient),
        enabled: !!practitionerId,
    })

    return {
        patients: data,
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
