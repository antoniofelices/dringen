import { useQuery } from '@tanstack/react-query'
import { getLocationsByIds } from '@resources/location/services/location.service'
import { fhirToLocation } from '@resources/location/domain/location.adapter'

export const useLocations = (ids: string[]) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['locations', ids],
        queryFn: () => getLocationsByIds(ids),
        select: (data) => data.map(fhirToLocation),
        enabled: ids.length > 0,
    })

    return {
        locations: data ?? [],
        isPending: isPending,
        isError: isError,
        error: error,
    }
}
