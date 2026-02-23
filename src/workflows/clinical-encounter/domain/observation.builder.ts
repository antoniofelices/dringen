import { v4 as uuidv4 } from 'uuid'
import type { BundleEntry, Observation } from '@medplum/fhirtypes'
import {
    LOINC_SYSTEM,
    SNOMED_SYSTEM,
    OBSERVATION_FIELDS,
    BIOLOGICAL_FIELDS,
} from '@workflows/clinical-encounter/config/config'

export function buildNumericObservation(
    fieldKey: keyof typeof OBSERVATION_FIELDS,
    value: string,
    encounterUuid: string,
    patientId: string
): { entry: BundleEntry; uuid: string } {
    const meta = OBSERVATION_FIELDS[fieldKey]
    const obsUuid = uuidv4()
    const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: {
            coding: [
                {
                    system: LOINC_SYSTEM,
                    code: meta.code,
                    display: meta.display,
                },
            ],
        },
        subject: { reference: `Patient/${patientId}` },
        encounter: { reference: `urn:uuid:${encounterUuid}` },
        valueQuantity: {
            value: parseFloat(value),
            unit: meta.unit,
            system: 'http://unitsofmeasure.org',
            code: meta.unitCode,
        },
    }

    return {
        entry: {
            fullUrl: `urn:uuid:${obsUuid}`,
            resource: observation,
            request: { method: 'POST', url: 'Observation' },
        },
        uuid: obsUuid,
    }
}

export function buildTextObservation(
    fieldKey: keyof typeof BIOLOGICAL_FIELDS,
    value: string,
    encounterUuid: string,
    patientId: string
): { entry: BundleEntry; uuid: string } {
    const meta = BIOLOGICAL_FIELDS[fieldKey]
    const obsUuid = uuidv4()
    const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: {
            coding: [
                {
                    system: meta.system,
                    code: meta.code,
                    display: meta.display,
                },
            ],
        },
        subject: { reference: `Patient/${patientId}` },
        encounter: { reference: `urn:uuid:${encounterUuid}` },
        valueString: value,
    }

    return {
        entry: {
            fullUrl: `urn:uuid:${obsUuid}`,
            resource: observation,
            request: { method: 'POST', url: 'Observation' },
        },
        uuid: obsUuid,
    }
}

export function buildDescriptionObservation(
    value: string,
    encounterUuid: string,
    patientId: string
): { entry: BundleEntry; uuid: string } {
    const obsUuid = uuidv4()
    const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: {
            coding: [
                {
                    system: SNOMED_SYSTEM,
                    code: '404684003',
                    display: 'Clinical finding',
                },
            ],
        },
        subject: { reference: `Patient/${patientId}` },
        encounter: { reference: `urn:uuid:${encounterUuid}` },
        valueString: value,
    }

    return {
        entry: {
            fullUrl: `urn:uuid:${obsUuid}`,
            resource: observation,
            request: { method: 'POST', url: 'Observation' },
        },
        uuid: obsUuid,
    }
}

export function buildExaminationObservation(
    value: string,
    encounterUuid: string,
    patientId: string
): { entry: BundleEntry; uuid: string } {
    const obsUuid = uuidv4()
    const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: {
            coding: [
                {
                    system: LOINC_SYSTEM,
                    code: '29545-1',
                    display: 'Physical findings',
                },
            ],
        },
        subject: { reference: `Patient/${patientId}` },
        encounter: { reference: `urn:uuid:${encounterUuid}` },
        valueString: value,
    }

    return {
        entry: {
            fullUrl: `urn:uuid:${obsUuid}`,
            resource: observation,
            request: { method: 'POST', url: 'Observation' },
        },
        uuid: obsUuid,
    }
}

export function buildPanelObservation(
    memberUuids: string[],
    encounterUuid: string,
    patientId: string
): BundleEntry {
    const panelUuid = uuidv4()
    const observation: Observation = {
        resourceType: 'Observation',
        status: 'final',
        code: {
            coding: [
                {
                    system: LOINC_SYSTEM,
                    code: '55752-0',
                    display: 'Clinical information',
                },
            ],
        },
        subject: { reference: `Patient/${patientId}` },
        encounter: { reference: `urn:uuid:${encounterUuid}` },
        hasMember: memberUuids.map((uuid) => ({
            reference: `urn:uuid:${uuid}`,
        })),
    }

    return {
        fullUrl: `urn:uuid:${panelUuid}`,
        resource: observation,
        request: { method: 'POST', url: 'Observation' },
    }
}
