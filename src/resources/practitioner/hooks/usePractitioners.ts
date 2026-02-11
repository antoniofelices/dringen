import { useQuery } from '@tanstack/react-query'
import { getListPractitioners } from '@resources/practitioner/services/practitioner.service'
import { fhirToPractitioner } from '@resources/practitioner/domain/practitioner.adapter'

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
