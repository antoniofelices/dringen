import { useQuery } from '@tanstack/react-query'
import {
    getLocationsByIds,
    getLocationsByParent,
} from '@resources/location/services/location.service'
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

export const useLocationsByParent = (parentId: string) => {
    const { data, isPending } = useQuery({
        queryKey: ['locations', 'byParent', parentId],
        queryFn: () => getLocationsByParent(parentId),
        select: (data) => data.map(fhirToLocation),
        enabled: !!parentId,
    })

    return {
        locations: data ?? [],
        isPending,
    }
}
