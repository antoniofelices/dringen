import { useQuery } from '@tanstack/react-query'
import { getClinicLocation } from '@resources/location/services/location.service'
import { fhirToLocation } from '@resources/location/domain/location.adapter'

export const useClinicLocation = () => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['locations', 'hos'],
        queryFn: () => getClinicLocation(),
        select: (data) => data.map(fhirToLocation),
    })

    return {
        locations: data ?? [],
        isPending,
        isError,
        error,
    }
}
