import type { Location } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'
import { HL7_TERMINOLOGY_BASE_URL } from '@shared/fhir/config'

export const getLocationsByIds = async (ids: string[]): Promise<Location[]> => {
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

export const getClinicLocation = async (): Promise<Location[]> => {
    try {
        await authenticateMedplum()
        const locations = await medplum.searchResources('Location', {
            type: `${HL7_TERMINOLOGY_BASE_URL}/v3-RoleCode|HOSP`,
        })
        if (locations.length === 0)
            throw new Error("The clinic's main location could not be found")
        if (locations.length > 1)
            throw new Error(
                'Inconsistency: multiple locations with the HOSP code'
            )
        return locations
    } catch (error) {
        logger.error('Error fetching locations from Server', error, {
            component: 'location.service',
            action: 'getLocationsHos',
        })
        throw error
    }
}

export const getRoomsByOrganization = async (
    organizationId: string
): Promise<Location[]> => {
    try {
        await authenticateMedplum()
        const locations = await medplum.searchResources('Location', {
            partof: `Organization/${organizationId}`,
        })
        return locations.filter(
            (l) => l.physicalType?.coding?.[0]?.display === 'Room'
        )
    } catch (error) {
        logger.error('Error fetching room locations from Server', error, {
            component: 'location.service',
            action: 'getRoomsByOrganization',
        })
        throw error
    }
}
