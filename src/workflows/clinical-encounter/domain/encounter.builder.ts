import type { BundleEntry, Encounter } from '@medplum/fhirtypes'

export function buildEncounterEntry(
    encounterUuid: string,
    patientId: string,
    practitionerId: string
): BundleEntry {
    const encounter: Encounter = {
        resourceType: 'Encounter',
        status: 'finished',
        class: {
            system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
            code: 'AMB',
            display: 'ambulatory',
        },
        subject: { reference: `Patient/${patientId}` },
        participant: [
            {
                individual: {
                    reference: `Practitioner/${practitionerId}`,
                },
            },
        ],
        period: {
            start: new Date().toISOString(),
            end: new Date().toISOString(),
        },
    }

    return {
        fullUrl: `urn:uuid:${encounterUuid}`,
        resource: encounter,
        request: { method: 'POST', url: 'Encounter' },
    }
}
