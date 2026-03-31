import type { Communication } from '@medplum/fhirtypes'
import type {
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

export function communicationToFhir() {
    return
}
