import type { AllergyIntolerance } from '@medplum/fhirtypes'
import type {
    AllergyIntoleranceType,
    AllergyIntoleranceFormType,
} from '@resources/allergy-intolerance/types/allergyIntolerance.model'

export function fhirToAllergyIntolerance(
    resource: AllergyIntolerance
): AllergyIntoleranceType {
    return {
        id: resource.id ?? '',
        substance:
            resource.code?.coding?.[0]?.display ??
            resource.code?.text ??
            '',
        type: resource.type ?? '',
        category: resource.category?.[0] ?? '',
        criticality: resource.criticality ?? '',
        clinicalStatus:
            resource.clinicalStatus?.coding?.[0]?.code ?? '',
        verificationStatus:
            resource.verificationStatus?.coding?.[0]?.code ?? '',
        onsetDateTime:
            (resource.onset as { dateTime?: string })?.dateTime ??
            (typeof resource.onset === 'string' ? resource.onset : '') ??
            (resource as Record<string, unknown>).onsetDateTime as string ??
            '',
        manifestation:
            resource.reaction?.[0]?.manifestation?.[0]?.coding?.[0]
                ?.display ??
            resource.reaction?.[0]?.manifestation?.[0]?.text ??
            '',
        severity: resource.reaction?.[0]?.severity ?? '',
        note: resource.note?.[0]?.text ?? '',
    }
}

export function allergyIntoleranceToFhir(
    formData: AllergyIntoleranceFormType,
    patientId: string
): AllergyIntolerance {
    const resource: AllergyIntolerance = {
        resourceType: 'AllergyIntolerance',
        patient: { reference: `Patient/${patientId}` },
    }

    if (formData.noKnownAllergies) {
        resource.code = {
            coding: [
                {
                    system: 'http://snomed.info/sct',
                    code: '716186003',
                    display: 'No known allergy',
                },
            ],
        }
        resource.clinicalStatus = {
            coding: [
                {
                    system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
                    code: formData.clinicalStatus,
                },
            ],
        }
        return resource
    }

    resource.code = {
        text: formData.substance,
    }

    if (formData.type) {
        resource.type = formData.type
    }

    if (formData.category) {
        resource.category = [formData.category]
    }

    if (formData.criticality) {
        resource.criticality = formData.criticality
    }

    resource.clinicalStatus = {
        coding: [
            {
                system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
                code: formData.clinicalStatus,
            },
        ],
    }

    if (formData.verificationStatus) {
        resource.verificationStatus = {
            coding: [
                {
                    system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification',
                    code: formData.verificationStatus,
                },
            ],
        }
    }

    if (formData.onsetDateTime) {
        ;(resource as Record<string, unknown>).onsetDateTime =
            formData.onsetDateTime
    }

    if (formData.manifestation) {
        resource.reaction = [
            {
                manifestation: [{ text: formData.manifestation }],
                ...(formData.severity
                    ? { severity: formData.severity }
                    : {}),
            },
        ]
    } else if (formData.severity) {
        resource.reaction = [
            {
                manifestation: [{ text: 'Unknown' }],
                severity: formData.severity,
            },
        ]
    }

    if (formData.note) {
        resource.note = [{ text: formData.note }]
    }

    return resource
}

export function allergyIntoleranceFormToFhir(
    formData: AllergyIntoleranceFormType,
    existing: AllergyIntolerance
): AllergyIntolerance {
    const patientId =
        existing.patient?.reference?.replace('Patient/', '') ?? ''
    const updated = allergyIntoleranceToFhir(formData, patientId)
    return {
        ...existing,
        ...updated,
        id: existing.id,
    }
}
