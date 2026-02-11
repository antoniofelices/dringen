import type { Practitioner } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const getListPractitioners = async (): Promise<Practitioner[]> => {
    try {
        await authenticateMedplum()

        const bundle = await medplum.searchResources('Practitioner', {
            _count: 1000,
        })

        return bundle
    } catch (error) {
        logger.error('Error fetching practitioners from Medplum', error, {
            component: 'practitioner.service',
            action: 'getListPractitioners',
        })
        throw error
    }
}
