import { useQuery } from '@tanstack/react-query'
import { usePractitionerRoleDetail } from '@resources/practitioner-role/hooks/usePractitionerRole'
import { useLocationsByParent } from '@resources/location/hooks/useLocationsByParent'
import { useLocations } from '@resources/location/hooks/useLocations'
import { getSinglePractitionerById } from '@resources/practitioner/services/practitioner.service'
import { fhirToPractitioner } from '@resources/practitioner/domain/practitioner.adapter'

export const usePractitionerDetails = (practitionerId: string) => {
    const {
        practitionerRole,
        isPending: isRolePending,
        isError: isRoleError,
        error: roleError,
    } = usePractitionerRoleDetail(practitionerId)

    const {
        data: practitioner,
        isPending: isPractitionerPending,
        isError: isPractitionerError,
        error: practitionerError,
    } = useQuery({
        queryKey: ['practitioner', practitionerId],
        queryFn: () => getSinglePractitionerById(practitionerId),
        select: fhirToPractitioner,
        enabled: !!practitionerId,
    })

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
        phone: practitioner?.phone ?? '',
        email: practitioner?.email ?? '',
        specialty: practitionerRole?.specialty ?? '',
        hospital: hospital?.name ?? '',
        hospitalId: hospital?.id ?? '',
        outpatientFacility: outpatientFacility?.name ?? '',
        outpatientFacilityId: outpatientFacility?.id ?? '',
        outpatientOptions,
        availableTime: practitionerRole?.availableTime ?? [],
        isPending: isRolePending || isLocationsPending || isPractitionerPending,
        isError: isRoleError || isPractitionerError,
        error: roleError || practitionerError,
        hasData: !!practitionerRole,
    }
}
