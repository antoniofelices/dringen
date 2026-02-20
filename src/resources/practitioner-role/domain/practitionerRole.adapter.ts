import type { PractitionerRole } from '@medplum/fhirtypes'
import type {
    PractitionerRoleDetailType,
    PractitionerDetailsFormData,
} from '@resources/practitioner-role/types/practitionerRole.model'

export function practitionerDetailsToFhir(
    formData: PractitionerDetailsFormData,
    existingRole: PractitionerRole,
    hospitalId?: string
): PractitionerRole {
    const locationRefs = [
        ...(hospitalId ? [{ reference: `Location/${hospitalId}` }] : []),
        ...(formData.outpatientFacility
            ? [{ reference: `Location/${formData.outpatientFacility}` }]
            : []),
    ]

    return {
        ...existingRole,
        specialty: [
            {
                coding: [
                    {
                        ...existingRole.specialty?.[0]?.coding?.[0],
                        display: formData.specialty,
                    },
                ],
            },
        ],
        location: locationRefs,
    }
}

export function fhirToPractitionerRoleDetail(
    role: PractitionerRole
): PractitionerRoleDetailType {
    const roleCode = role.code?.[0]?.coding?.[0]?.code ?? ''
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
        role: roleCode,
        specialty,
        availableTime,
        locationIds,
    }
}
