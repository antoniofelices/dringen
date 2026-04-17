import { useQuery } from '@tanstack/react-query'
import { getLocationsByParent } from '@resources/location/services/location.service'
import { fhirToLocation } from '@resources/location/domain/location.adapter'

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
