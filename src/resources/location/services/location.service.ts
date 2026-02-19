import type { Location } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const getLocationsByIds = async (
    ids: string[]
): Promise<Location[]> => {
    try {
        await authenticateMedplum()
        return await medplum.searchResources('Location', {
            _id: ids.join(','),
        })
    } catch (error) {
        logger.error('Error fetching locations from Server', error, {
            component: 'location.service',
            action: 'getLocationsByIds',
        })
        throw error
    }
}

export const getLocationsByParent = async (
    parentId: string
): Promise<Location[]> => {
    try {
        await authenticateMedplum()
        return await medplum.searchResources('Location', {
            partof: `Location/${parentId}`,
        })
    } catch (error) {
        logger.error('Error fetching locations from Server', error, {
            component: 'location.service',
            action: 'getLocationsByParent',
        })
        throw error
    }
}
