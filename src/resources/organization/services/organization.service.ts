import type { Organization } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

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
