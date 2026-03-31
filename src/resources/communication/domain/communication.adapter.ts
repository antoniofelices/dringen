import type { Communication } from '@medplum/fhirtypes'
import {
    COMMUNICATION_TAG_SYSTEM,
    COMMUNICATION_TAG_CODE,
    COMMUNICATION_CATEGORY_SYSTEM,
    COMMUNICATION_CATEGORY_CODE,
} from '@resources/communication/config/config'
import type {
    AddNewCommunicationType,
    CommunicationType,
    CommunicationPayloadType,
} from '@resources/communication/types/communication.model'

function parseContentString(
    contentString: string | undefined
): CommunicationPayloadType | null {
    if (!contentString) return null
    try {
        return JSON.parse(contentString)
    } catch {
        return null
    }
}

export function fhirToCommunication(
    communication: Communication
): CommunicationType | null {
    const parsed = parseContentString(communication.payload?.[0]?.contentString)
    if (!parsed) return null
    return {
        id: communication.id ?? '',
        title: parsed.title ?? '',
        content: parsed.content ?? '',
        startDate: parsed.startDate ?? '',
        endDate: parsed.endDate ?? '',
        location: parsed.location ?? '',
        sent: communication.sent ?? '',
    }
}

export function addNewCommunicationToFhir(
    formData: AddNewCommunicationType,
    sender: { id: string; displayName: string }
): Communication {
    const payload: CommunicationPayloadType = {
        title: formData.title,
        content: formData.content,
        startDate: formData.startDate?.toISOString() ?? '',
        endDate: formData.endDate?.toISOString() ?? '',
        location: formData.location ?? '',
    }

    return {
        resourceType: 'Communication',
        meta: {
            tag: [
                {
                    system: COMMUNICATION_TAG_SYSTEM,
                    code: COMMUNICATION_TAG_CODE,
                },
            ],
        },
        status: 'completed',
        category: [
            {
                coding: [
                    {
                        system: COMMUNICATION_CATEGORY_SYSTEM,
                        code: COMMUNICATION_CATEGORY_CODE,
                    },
                ],
            },
        ],
        sender: {
            reference: `Practitioner/${sender.id}`,
            display: sender.displayName,
        },
        recipient: [{ display: 'broadcast' }],
        sent: new Date().toISOString(),
        payload: [{ contentString: JSON.stringify(payload) }],
    }
}
