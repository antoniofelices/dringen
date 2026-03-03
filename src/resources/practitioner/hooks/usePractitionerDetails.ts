import { usePractitionerRoleDetail } from '@resources/practitioner-role/hooks/usePractitionerRole'
import {
    useLocations,
    useLocationsByParent,
} from '@resources/location/hooks/useLocation'

export const usePractitionerDetails = (practitionerId: string) => {
    const {
        practitionerRole,
        isPending: isRolePending,
        isError,
        error,
    } = usePractitionerRoleDetail(practitionerId)

    const { locations, isPending: isLocationsPending } = useLocations(
        practitionerRole?.locationIds ?? []
    )

    const hospital = locations.find((l) => l.type === 'Hospital')
    const outpatientFacility = locations.find(
        (l) => l.type === 'Outpatient Facility'
    )

    const { locations: outpatientLocations } = useLocationsByParent(
        hospital?.id ?? ''
    )

    const outpatientOptions = outpatientLocations.map((l) => ({
        label: l.name,
        value: l.id,
    }))

    return {
        specialty: practitionerRole?.specialty ?? '',
        hospital: hospital?.name ?? '',
        hospitalId: hospital?.id ?? '',
        outpatientFacility: outpatientFacility?.name ?? '',
        outpatientFacilityId: outpatientFacility?.id ?? '',
        outpatientOptions,
        availableTime: practitionerRole?.availableTime ?? [],
        isPending: isRolePending || isLocationsPending,
        isError,
        error,
        hasData: !!practitionerRole,
    }
}
