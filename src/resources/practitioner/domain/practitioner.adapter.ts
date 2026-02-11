import type { Practitioner } from '@medplum/fhirtypes'
import type { PractitionerType } from '@resources/practitioner/types/practitioner.model'

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
