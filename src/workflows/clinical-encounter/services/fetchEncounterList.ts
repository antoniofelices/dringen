import type { Bundle, Condition, Encounter } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'
import type { EncounterListResponseType } from '@workflows/clinical-encounter/types/clinicalEncounter.model'

export const fetchEncounterList = async (
    patientId: string
): Promise<EncounterListResponseType> => {
    try {
        await authenticateMedplum()

        const batch: Bundle = {
            resourceType: 'Bundle',
            type: 'batch',
            entry: [
                {
                    request: {
                        method: 'GET',
                        url: `Encounter?patient=${patientId}&_sort=-date`,
                    },
                },
                {
                    request: {
                        method: 'GET',
                        url: `Condition?patient=${patientId}`,
                    },
                },
            ],
        }

        const response = await medplum.executeBatch(batch)

        const encounterBundle = response.entry?.[0]?.resource as
            | Bundle
            | undefined
        const conditionBundle = response.entry?.[1]?.resource as
            | Bundle
            | undefined

        const encounters = (encounterBundle?.entry ?? [])
            .map((e) => e.resource)
            .filter((r): r is Encounter => r?.resourceType === 'Encounter')

        const conditions = (conditionBundle?.entry ?? [])
            .map((e) => e.resource)
            .filter((r): r is Condition => r?.resourceType === 'Condition')

        return { encounters, conditions }
    } catch (error) {
        logger.error('Error fetching encounter list', error, {
            component: 'clinicalEncounter.service',
            action: 'fetchEncounterList',
        })
        throw error
    }
}
