import type { ContactPoint, Practitioner } from '@medplum/fhirtypes'
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
        phone:
            practitioner.telecom?.find((t) => t.system === 'phone')?.value ??
            '',
        email:
            practitioner.telecom?.find((t) => t.system === 'email')?.value ??
            '',
    }
}

export function practitionerContactToFhir(
    formData: { phone?: string; email?: string },
    existingPractitioner: Practitioner
): Practitioner {
    const otherTelecom: ContactPoint[] =
        existingPractitioner.telecom?.filter(
            (t) => t.system !== 'phone' && t.system !== 'email'
        ) ?? []

    const telecom: ContactPoint[] = [...otherTelecom]

    if (formData.phone) {
        telecom.push({ system: 'phone', value: formData.phone })
    }

    if (formData.email) {
        telecom.push({ system: 'email', value: formData.email })
    }

    return { ...existingPractitioner, telecom }
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
