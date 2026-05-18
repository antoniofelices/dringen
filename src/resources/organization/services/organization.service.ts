import type { Organization } from '@medplum/fhirtypes'
import { medplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const getOrganization = async (): Promise<Organization> => {
    try {
const organization = await medplum.searchOne('Organization')
        if (!organization) {
            throw new Error('No organization found')
        }
        return organization
    } catch (error) {
        logger.error('Error fetching clinic organization from Medplum', error, {
            component: 'organization.service',
            action: 'getOrganization',
        })
        throw error
    }
}

export const getOrganizationById = async (
    id: string
): Promise<Organization> => {
    try {
return await medplum.readResource('Organization', id)
    } catch (error) {
        logger.error('Error fetching organization from Medplum', error, {
            component: 'organization.service',
            action: 'getOrganizationById',
        })
        throw error
    }
}

export const updateOrganization = async (
    id: string,
    organization: Organization
): Promise<Organization> => {
    try {
return await medplum.updateResource({ ...organization, id })
    } catch (error) {
        logger.error('Error updating organization in Medplum', error, {
            component: 'organization.service',
            action: 'updateOrganization',
        })
        throw error
    }
}

export const getListOrganizations = async (): Promise<Organization[]> => {
    try {
        const bundle = await medplum.searchResources('Organization', {
            _count: 1000,
        })

        return bundle
    } catch (error) {
        logger.error('Error fetching organizations from Medplum', error, {
            component: 'organization.service',
            action: 'getListOrganizations',
        })
        throw error
    }
}
