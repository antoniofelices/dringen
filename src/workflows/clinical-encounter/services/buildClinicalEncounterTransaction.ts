import type { Bundle } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const executeClinicalEncounterTransaction = async (
    bundle: Bundle
): Promise<Bundle> => {
    try {
        await authenticateMedplum()

        return await medplum.executeBatch(bundle)
    } catch (error) {
        logger.error(
            'Error executing clinical encounter transaction',
            error,
            {
                component: 'clinicalEncounter.service',
                action: 'executeClinicalEncounterTransaction',
            }
        )
        throw error
    }
}
