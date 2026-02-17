import { useQuery } from '@tanstack/react-query'
import {
    getListPractitioners,
    getListPhysicians,
} from '@resources/practitioner/services/practitioner.service'
import {
    fhirToPractitioner,
    fhirToPhysician,
} from '@resources/practitioner/domain/practitioner.adapter'

export const usePractitioners = () => {
    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ['listPractitioners'],
        queryFn: () => getListPractitioners(),
        select: (data) => data.map(fhirToPractitioner),
    })

    return {
        practitioners: data,
        isPending: isPending,
        isError: isError,
        error: error,
        refetch: refetch,
    }
}

export const usePhysicians = () => {
    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ['listPhysicians'],
        queryFn: () => getListPhysicians(),
        select: (data) => data.map(fhirToPhysician),
    })

    return {
        physicians: data,
        isPending: isPending,
        isError: isError,
        error: error,
        refetch: refetch,
    }
}
