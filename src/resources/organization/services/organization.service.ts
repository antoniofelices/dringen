import type { Organization } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const getOrganization = async (): Promise<Organization> => {
    try {
        await authenticateMedplum()
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
        await authenticateMedplum()
        return await medplum.readResource('Organization', id)
    } catch (error) {
        logger.error('Error fetching organization from Medplum', error, {
            component: 'organization.service',
            action: 'getOrganizationById',
        })
        throw error
    }
}

export const getListOrganizations = async (): Promise<Organization[]> => {
    try {
        await authenticateMedplum()

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
