import { usePractitionerRoleDetail } from '@resources/practitioner-role/hooks/usePractitionerRole'
import { useLocations } from '@resources/location/hooks/useLocation'

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

    const availableTime = (practitionerRole?.availableTime ?? [])
        .map(
            (time) =>
                `${time.daysOfWeek}: ${time.startTime} - ${time.endTime}`
        )
        .join(' | ')

    return {
        specialty: practitionerRole?.specialty ?? '',
        hospital: hospital?.name ?? '',
        outpatientFacility: outpatientFacility?.name ?? '',
        availableTime,
        isPending: isRolePending || isLocationsPending,
        isError: isError,
        error: error,
        hasData: !!practitionerRole,
    }
}
