import type { Communication } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const getListCommunications = async (): Promise<Communication[]> => {
    try {
        await authenticateMedplum()

        return await medplum.searchResources('Communication', {
            category: 'clinic-announcement',
            _count: 1000,
        })
    } catch (error) {
        logger.error('Error fetching communications from Server', error, {
            component: 'communication.service',
            action: 'getListCommunications',
        })
        throw error
    }
}

export const createCommunication = async (
    communication: Communication
): Promise<Communication> => {
    try {
        await authenticateMedplum()

        return await medplum.createResource(communication)
    } catch (error) {
        logger.error('Error creating communication in Server', error, {
            component: 'communication.service',
            action: 'createCommunication',
        })
        throw error
    }
}

export const getSingleCommunication = async (
    id: string
): Promise<Communication> => {
    try {
        await authenticateMedplum()

        return await medplum.readResource('Communication', id)
    } catch (error) {
        logger.error('Error fetching communication from Server', error, {
            component: 'communication.service',
            action: 'getSingleCommunication',
        })
        throw error
    }
}
