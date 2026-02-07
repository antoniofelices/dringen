import { MedplumClient } from '@medplum/core'
import type { Patient } from '@medplum/fhirtypes'
import { MEDPLUM_CONFIG } from '@config/config'
import { logger } from '@shared/utils/Logger'

const medplum = new MedplumClient({
    baseUrl: MEDPLUM_CONFIG.baseUrl,
    clientId: MEDPLUM_CONFIG.clientId,
})

const authenticateMedplum = async () => {
    if (MEDPLUM_CONFIG.clientSecret) {
        await medplum.startClientLogin(
            MEDPLUM_CONFIG.clientId,
            MEDPLUM_CONFIG.clientSecret
        )
    }
}

export const getListPatients = async (): Promise<Patient[]> => {
    try {
        await authenticateMedplum()

        const bundle = await medplum.searchResources('Patient', {
            _count: 1000,
        })

        return bundle as Patient[]
    } catch (error) {
        logger.error('Error fetching patients from Medplum', error, {
            component: 'medplum.service',
            action: 'getListPatients',
        })
        throw error
    }
}
