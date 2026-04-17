import { useQuery } from '@tanstack/react-query'
import { getLocationsHos } from '@resources/location/services/location.service'
import { fhirToLocation } from '@resources/location/domain/location.adapter'

export const useLocationsHos = () => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['locations', 'hos'],
        queryFn: () => getLocationsHos(),
        select: (data) => data.map(fhirToLocation),
    })

    return {
        locations: data ?? [],
        isPending,
        isError,
        error,
    }
}
