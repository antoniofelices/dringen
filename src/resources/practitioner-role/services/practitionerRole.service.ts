import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const getPractitionerIdsByRole = async (
    role: string
): Promise<string[]> => {
    try {
        await authenticateMedplum()

        const roles = await medplum.searchResources('PractitionerRole', {
            role,
            _count: 1000,
        })

        return roles
            .map((role) => role.practitioner?.reference?.split('/')[1])
            .filter((id): id is string => !!id)
    } catch (error) {
        logger.error('Error fetching practitioner roles from Server', error, {
            component: 'practitionerRole.service',
            action: 'getPractitionerIdsByRole',
        })
        throw error
    }
}
