import type { Location } from '@medplum/fhirtypes'
import type { LocationType } from '@resources/location/types/location.model'

export function fhirToLocation(location: Location): LocationType {
    return {
        id: location.id ?? '',
        name: location.name ?? '',
        type: location.type?.[0]?.coding?.[0]?.display ?? '',
    }
}
