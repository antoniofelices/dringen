import type { Basic } from '@medplum/fhirtypes'
import type { PhysicianNoteType } from '@resources/basic/physician-note/types/physicianRole.model'
import {
    PHYSICIAN_NOTE_CODE_SYSTEM,
    PHYSICIAN_NOTE_CODE,
    PHYSICIAN_NOTE_TEXT_URL,
} from '@resources/basic/physician-note/config/config'

export function fhirToPhysicianNote(basic: Basic): PhysicianNoteType {
    return {
        id: basic.id ?? '',
        text:
            basic.extension?.find((e) => e.url === PHYSICIAN_NOTE_TEXT_URL)
                ?.valueString ?? '',
        practitionerId: basic.subject?.reference?.split('/')[1] ?? '',
        createdAt: basic.created ?? '',
    }
}

export function physicianNoteToFhir(
    text: string,
    practitionerId: string
): Basic {
    return {
        resourceType: 'Basic',
        code: {
            coding: [
                {
                    system: PHYSICIAN_NOTE_CODE_SYSTEM,
                    code: PHYSICIAN_NOTE_CODE,
                },
            ],
        },
        subject: {
            reference: `Practitioner/${practitionerId}`,
        },
        extension: [
            {
                url: PHYSICIAN_NOTE_TEXT_URL,
                valueString: text,
            },
        ],
    }
}
