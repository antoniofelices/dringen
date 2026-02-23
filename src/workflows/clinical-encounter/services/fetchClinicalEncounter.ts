import type {
    Bundle,
    Condition,
    Encounter,
    MedicationRequest,
    Observation,
    ServiceRequest,
} from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'
import type { ClinicalEncounterReadResponseType } from '@workflows/clinical-encounter/types/clinicalEncounter.model'

export const fetchClinicalEncounter = async (
    encounterId: string
): Promise<ClinicalEncounterReadResponseType> => {
    try {
        await authenticateMedplum()

        const batch: Bundle = {
            resourceType: 'Bundle',
            type: 'batch',
            entry: [
                {
                    request: {
                        method: 'GET',
                        url: `Encounter/${encounterId}`,
                    },
                },
                {
                    request: {
                        method: 'GET',
                        url: `Observation?encounter=Encounter/${encounterId}`,
                    },
                },
                {
                    request: {
                        method: 'GET',
                        url: `Condition?encounter=Encounter/${encounterId}`,
                    },
                },
                {
                    request: {
                        method: 'GET',
                        url: `MedicationRequest?encounter=Encounter/${encounterId}`,
                    },
                },
                {
                    request: {
                        method: 'GET',
                        url: `ServiceRequest?encounter=Encounter/${encounterId}`,
                    },
                },
            ],
        }

        const response = await medplum.executeBatch(batch)

        const encounter = response.entry?.[0]?.resource as
            | Encounter
            | undefined

        const observationBundle = response.entry?.[1]?.resource as
            | Bundle
            | undefined
        const conditionBundle = response.entry?.[2]?.resource as
            | Bundle
            | undefined
        const medicationRequestBundle = response.entry?.[3]?.resource as
            | Bundle
            | undefined
        const serviceRequestBundle = response.entry?.[4]?.resource as
            | Bundle
            | undefined

        const observations = (observationBundle?.entry ?? [])
            .map((e) => e.resource)
            .filter(
                (r): r is Observation => r?.resourceType === 'Observation'
            )

        const conditions = (conditionBundle?.entry ?? [])
            .map((e) => e.resource)
            .filter((r): r is Condition => r?.resourceType === 'Condition')

        const medicationRequests = (medicationRequestBundle?.entry ?? [])
            .map((e) => e.resource)
            .filter(
                (r): r is MedicationRequest =>
                    r?.resourceType === 'MedicationRequest'
            )

        const serviceRequests = (serviceRequestBundle?.entry ?? [])
            .map((e) => e.resource)
            .filter(
                (r): r is ServiceRequest =>
                    r?.resourceType === 'ServiceRequest'
            )

        if (!encounter) {
            throw new Error(`Encounter ${encounterId} not found`)
        }

        return {
            encounter,
            observations,
            conditions,
            medicationRequests,
            serviceRequests,
        }
    } catch (error) {
        logger.error('Error fetching clinical encounter', error, {
            component: 'clinicalEncounter.service',
            action: 'fetchClinicalEncounter',
        })
        throw error
    }
}
