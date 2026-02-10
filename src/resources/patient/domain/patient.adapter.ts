import type { Patient } from '@medplum/fhirtypes'
import type { PatientType } from '@resources/patient/types/patient.model'

export function fhirToPatient(patient: Patient): PatientType {
    return {
        id: patient.id ?? '',
        firstName: patient.name?.[0]?.given?.[0] ?? '',
        lastName: patient.name?.[0]?.family ?? '',
        birthDate: patient.birthDate ?? '',
        email:
            patient.telecom?.find((t) => t.system === 'email')?.value ?? '',
        address: patient.address?.[0]?.text ?? '',
        dni:
            patient.identifier?.find((id) =>
                id.type?.coding?.some((c) => c.code === 'NI')
            )?.value ?? '',
        gender: patient.gender ?? 'unknown',
    }
}
