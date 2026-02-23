import { v4 as uuidv4 } from 'uuid'
import type { BundleEntry, Condition } from '@medplum/fhirtypes'
import {
    SNOMED_SYSTEM,
    ICD10_SYSTEM,
    CERTAINTY_MAP,
} from '@workflows/clinical-encounter/config/config'

export function buildConditionEntry(
    diagnosis: { cie10: string; diagnosis: string; certainty: string },
    encounterUuid: string,
    patientId: string
): BundleEntry {
    const conditionUuid = uuidv4()
    const certaintyMeta =
        CERTAINTY_MAP[diagnosis.certainty as keyof typeof CERTAINTY_MAP]

    const condition: Condition = {
        resourceType: 'Condition',
        clinicalStatus: {
            coding: [
                {
                    system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                    code: 'active',
                },
            ],
        },
        verificationStatus: {
            coding: [
                {
                    system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
                    code:
                        diagnosis.certainty === 'confirmed'
                            ? 'confirmed'
                            : diagnosis.certainty === 'probable'
                              ? 'provisional'
                              : 'differential',
                },
            ],
        },
        code: {
            coding: [
                ...(diagnosis.cie10
                    ? [
                          {
                              system: ICD10_SYSTEM,
                              code: diagnosis.cie10,
                          },
                      ]
                    : []),
            ],
            text: diagnosis.diagnosis,
        },
        subject: { reference: `Patient/${patientId}` },
        encounter: { reference: `urn:uuid:${encounterUuid}` },
        ...(certaintyMeta && {
            evidence: [
                {
                    code: [
                        {
                            coding: [
                                {
                                    system: SNOMED_SYSTEM,
                                    code: certaintyMeta.code,
                                    display: certaintyMeta.display,
                                },
                            ],
                        },
                    ],
                },
            ],
        }),
    }

    return {
        fullUrl: `urn:uuid:${conditionUuid}`,
        resource: condition,
        request: { method: 'POST', url: 'Condition' },
    }
}
