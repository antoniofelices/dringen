import type { AccessPolicy } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const getAccessPolicyList = async (): Promise<AccessPolicy[]> => {
    try {
        await authenticateMedplum()
        return await medplum.searchResources('AccessPolicy')
    } catch (error) {
        logger.error('Error fetching access policy from Server', error, {
            component: 'accessPolicy.service',
            action: 'getAccessPolicyList',
        })
        throw error
    }
}
