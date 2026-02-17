import type { PractitionerRole } from '@medplum/fhirtypes'
import type { PractitionerRoleDetailType } from '@resources/practitioner-role/types/practitionerRole.model'

export function fhirToPractitionerRoleDetail(
    role: PractitionerRole
): PractitionerRoleDetailType {
    const specialty = role.specialty?.[0]?.coding?.[0]?.display ?? ''

    const availableTime = (role.availableTime ?? []).map((time) => ({
        daysOfWeek: (time.daysOfWeek ?? []).join(', '),
        startTime: time.availableStartTime ?? '',
        endTime: time.availableEndTime ?? '',
    }))

    const locationIds = (role.location ?? [])
        .map((ref) => ref.reference?.split('/')[1])
        .filter((id): id is string => !!id)

    return {
        specialty,
        availableTime,
        locationIds,
    }
}
