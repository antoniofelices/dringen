import { v4 as uuidv4 } from 'uuid'
import type { Bundle, BundleEntry } from '@medplum/fhirtypes'
import type { AggregateParams } from '@workflows/clinical-encounter/types/clinicalEncounter.model'
import {
    OBSERVATION_FIELDS,
    BIOLOGICAL_FIELDS,
} from '@workflows/clinical-encounter/config/config'
import { buildEncounterEntry } from './encounter.builder'
import {
    buildNumericObservation,
    buildTextObservation,
    buildDescriptionObservation,
    buildExaminationObservation,
    buildPanelObservation,
} from './observation.builder'
import { buildConditionEntry } from './condition.builder'
import {
    buildServiceRequestEntry,
    buildMedicationRequestEntry,
} from './request.builder'

export function buildClinicalEncounterBundle({
    formData,
    patientId,
    practitionerId,
}: AggregateParams): Bundle {
    const encounterUuid = uuidv4()
    const entries: BundleEntry[] = []
    const observationUuids: string[] = []

    // 1. Encounter
    entries.push(buildEncounterEntry(encounterUuid, patientId, practitionerId))

    // 2. Observations - description
    if (formData.description) {
        const { entry, uuid } = buildDescriptionObservation(
            formData.description,
            encounterUuid,
            patientId
        )
        entries.push(entry)
        observationUuids.push(uuid)
    }

    // 3. Observations - examination
    if (formData.examination) {
        const { entry, uuid } = buildExaminationObservation(
            formData.examination,
            encounterUuid,
            patientId
        )
        entries.push(entry)
        observationUuids.push(uuid)
    }

    // 4. Numeric observations (weight, height, vitals)
    const numericFields = Object.keys(OBSERVATION_FIELDS) as Array<
        keyof typeof OBSERVATION_FIELDS
    >
    for (const field of numericFields) {
        const value = formData[field]
        if (value) {
            const { entry, uuid } = buildNumericObservation(
                field,
                value,
                encounterUuid,
                patientId
            )
            entries.push(entry)
            observationUuids.push(uuid)
        }
    }

    // 5. Biological basics (text observations)
    const bioFields = Object.keys(BIOLOGICAL_FIELDS) as Array<
        keyof typeof BIOLOGICAL_FIELDS
    >
    for (const field of bioFields) {
        const value = formData[field]
        if (value) {
            const { entry, uuid } = buildTextObservation(
                field,
                value,
                encounterUuid,
                patientId
            )
            entries.push(entry)
            observationUuids.push(uuid)
        }
    }

    // 6. Panel observation grouping all individual observations
    if (observationUuids.length > 0) {
        entries.push(
            buildPanelObservation(observationUuids, encounterUuid, patientId)
        )
    }

    // 7. Conditions
    const diagnoses = formData.diagnoses ?? []
    for (const diagnosis of diagnoses) {
        if (diagnosis.diagnosis || diagnosis.cie10) {
            entries.push(
                buildConditionEntry(diagnosis, encounterUuid, patientId)
            )
        }
    }

    // 8. ServiceRequest
    if (formData.additional_tests) {
        entries.push(
            buildServiceRequestEntry(
                formData.additional_tests,
                encounterUuid,
                patientId,
                practitionerId
            )
        )
    }

    // 9. MedicationRequest
    if (formData.treatment) {
        entries.push(
            buildMedicationRequestEntry(
                formData.treatment,
                encounterUuid,
                patientId,
                practitionerId
            )
        )
    }

    return {
        resourceType: 'Bundle',
        type: 'transaction',
        entry: entries,
    }
}
