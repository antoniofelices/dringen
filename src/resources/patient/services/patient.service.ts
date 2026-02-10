import type { Patient } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const getListPatients = async (): Promise<Patient[]> => {
    try {
        await authenticateMedplum()

        const bundle = await medplum.searchResources('Patient', {
            _count: 1000,
        })

        return bundle
    } catch (error) {
        logger.error('Error fetching patients from Medplum', error, {
            component: 'medplum.service',
            action: 'getListPatients',
        })
        throw error
    }
}
