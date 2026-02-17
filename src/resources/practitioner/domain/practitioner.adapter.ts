import type { Practitioner } from '@medplum/fhirtypes'
import type { PractitionerType } from '@resources/practitioner/types/practitioner.model'
import type { PhysicianType } from '@resources/practitioner/types/practitioner.model'
import type { PractitionerWithSpecialty } from '@resources/practitioner/types/practitioner.model'

export function fhirToPractitioner(
    practitioner: Practitioner
): PractitionerType {
    return {
        id: practitioner.id ?? '',
        firstName: practitioner.name?.[0]?.given?.[0] ?? '',
        lastName: practitioner.name?.[0]?.family ?? '',
        email:
            practitioner.telecom?.find((t) => t.system === 'email')?.value ??
            '',
    }
}

export function fhirToPhysician(
    data: PractitionerWithSpecialty
): PhysicianType {
    return {
        id: data.practitioner.id ?? '',
        firstName: data.practitioner.name?.[0]?.given?.[0] ?? '',
        lastName: data.practitioner.name?.[0]?.family ?? '',
        specialty: data.specialty,
    }
}
