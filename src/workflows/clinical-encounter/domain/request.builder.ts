import { v4 as uuidv4 } from 'uuid'
import type {
    BundleEntry,
    ServiceRequest,
    MedicationRequest,
} from '@medplum/fhirtypes'

export function buildServiceRequestEntry(
    text: string,
    encounterUuid: string,
    patientId: string,
    practitionerId: string
): BundleEntry {
    const srUuid = uuidv4()
    const serviceRequest: ServiceRequest = {
        resourceType: 'ServiceRequest',
        status: 'active',
        intent: 'order',
        subject: { reference: `Patient/${patientId}` },
        encounter: { reference: `urn:uuid:${encounterUuid}` },
        requester: { reference: `Practitioner/${practitionerId}` },
        note: [{ text }],
    }

    return {
        fullUrl: `urn:uuid:${srUuid}`,
        resource: serviceRequest,
        request: { method: 'POST', url: 'ServiceRequest' },
    }
}

export function buildMedicationRequestEntry(
    text: string,
    encounterUuid: string,
    patientId: string,
    practitionerId: string
): BundleEntry {
    const mrUuid = uuidv4()
    const medicationRequest: MedicationRequest = {
        resourceType: 'MedicationRequest',
        status: 'active',
        intent: 'order',
        subject: { reference: `Patient/${patientId}` },
        encounter: { reference: `urn:uuid:${encounterUuid}` },
        requester: { reference: `Practitioner/${practitionerId}` },
        note: [{ text }],
    }

    return {
        fullUrl: `urn:uuid:${mrUuid}`,
        resource: medicationRequest,
        request: { method: 'POST', url: 'MedicationRequest' },
    }
}
