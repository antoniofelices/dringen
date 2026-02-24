import type { FamilyMemberHistory } from '@medplum/fhirtypes'
import type {
    FamilyMemberHistoryType,
    FamilyMemberHistoryFormType,
} from '@resources/family-member-history/types/familyMemberHistory.model'

export function fhirToFamilyMemberHistory(
    resource: FamilyMemberHistory
): FamilyMemberHistoryType {
    return {
        id: resource.id ?? '',
        relationship:
            resource.relationship?.coding?.[0]?.display ??
            resource.relationship?.text ??
            '',
        condition:
            resource.condition?.[0]?.code?.coding?.[0]?.display ??
            resource.condition?.[0]?.code?.text ??
            '',
        status: resource.status ?? '',
        deceasedBoolean: resource.deceasedBoolean === true,
        note: resource.note?.[0]?.text ?? '',
    }
}

export function familyMemberHistoryToFhir(
    formData: FamilyMemberHistoryFormType,
    patientId: string
): FamilyMemberHistory {
    const resource: FamilyMemberHistory = {
        resourceType: 'FamilyMemberHistory',
        patient: { reference: `Patient/${patientId}` },
        status: formData.status,
        relationship: { text: '' },
    }

    if (formData.noKnownFamilyHistory) {
        resource.relationship = {
            coding: [
                {
                    system: 'http://terminology.hl7.org/CodeSystem/v3-RoleCode',
                    code: 'FAMMEMB',
                    display: 'family member',
                },
            ],
        }
        resource.condition = [
            {
                code: {
                    coding: [
                        {
                            system: 'http://snomed.info/sct',
                            code: '160303001',
                            display: 'No family history of disorder',
                        },
                    ],
                },
            },
        ]
        return resource
    }

    resource.relationship = {
        coding: [
            {
                system: 'http://terminology.hl7.org/CodeSystem/v3-RoleCode',
                code: formData.relationship,
                display:
                    relationshipDisplayMap[formData.relationship] ??
                    formData.relationship,
            },
        ],
    }

    if (formData.condition) {
        resource.condition = [
            {
                code: { text: formData.condition },
            },
        ]
    }

    if (formData.deceasedBoolean) {
        resource.deceasedBoolean = true
    }

    if (formData.note) {
        resource.note = [{ text: formData.note }]
    }

    return resource
}

export function familyMemberHistoryFormToFhir(
    formData: FamilyMemberHistoryFormType,
    existing: FamilyMemberHistory
): FamilyMemberHistory {
    const patientId = existing.patient?.reference?.replace('Patient/', '') ?? ''
    const updated = familyMemberHistoryToFhir(formData, patientId)
    return {
        ...existing,
        ...updated,
        id: existing.id,
    }
}

const relationshipDisplayMap: Record<string, string> = {
    FTH: 'Father',
    MTH: 'Mother',
    BRO: 'Brother',
    SIS: 'Sister',
    GRFTH: 'Grandfather',
    GRMTH: 'Grandmother',
    SON: 'Son',
    DAU: 'Daughter',
    UNCLE: 'Uncle',
    AUNT: 'Aunt',
    NBRO: 'Half-brother',
    NSIS: 'Half-sister',
}
