import type { Patient } from '@medplum/fhirtypes'
import type { PatientType } from '@resources/patient/types/patient.model'
import type { AddNewPatientType } from '@resources/patient/types/patient.model'

export function fhirToPatient(patient: Patient): PatientType {
    return {
        id: patient.id ?? '',
        firstName: patient.name?.[0]?.given?.[0] ?? '',
        lastName: patient.name?.[0]?.family ?? '',
        birthDate: patient.birthDate ?? '',
        email: patient.telecom?.find((t) => t.system === 'email')?.value ?? '',
        address: patient.address?.[0]?.text ?? '',
        dni:
            patient.identifier?.find((id) =>
                id.type?.coding?.some((c) => c.code === 'NI')
            )?.value ?? '',
        gender: patient.gender ?? 'unknown',
    }
}

export function patientToFhir(formData: AddNewPatientType): Patient {
    return {
        resourceType: 'Patient',
        name: [
            {
                given: [formData.userName],
                family: formData.userLastName,
            },
        ],
        identifier: [
            {
                use: 'official',
                type: {
                    coding: [
                        {
                            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
                            code: 'NI',
                        },
                    ],
                    text: 'DNI',
                },
                system: 'http://reniec.gob.pe/dni',
                value: formData.dni,
            },
        ],
        active: true,
        gender: formData.gender,
        birthDate: formData.birthDate.toISOString().split('T')[0],
        telecom: [
            {
                system: 'email',
                value: formData.email,
            },
            ...(formData.phone
                ? [{ system: 'phone' as const, value: formData.phone }]
                : []),
        ],
        address: [
            {
                line: formData.street ? [formData.street] : [],
                district: formData.district,
                city: formData.city,
                postalCode: formData.postcode,
                country: formData.country,
            },
        ],
    }
}
