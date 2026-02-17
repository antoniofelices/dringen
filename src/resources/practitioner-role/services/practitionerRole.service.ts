import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export type PractitionerRoleInfo = {
    practitionerId: string
    specialty: string
}

export const getPractitionerIdsByRole = async (
    role: string
): Promise<PractitionerRoleInfo[]> => {
    try {
        await authenticateMedplum()

        const roles = await medplum.searchResources('PractitionerRole', {
            role,
            _count: 1000,
        })

        return roles
            .map((role) => {
                const practitionerId =
                    role.practitioner?.reference?.split('/')[1]
                if (!practitionerId) return null

                const specialty =
                    role.specialty?.[0]?.coding?.[0]?.display ?? ''

                return { practitionerId, specialty }
            })
            .filter((info): info is PractitionerRoleInfo => info !== null)
    } catch (error) {
        logger.error('Error fetching practitioner roles from Server', error, {
            component: 'practitionerRole.service',
            action: 'getPractitionerIdsByRole',
        })
        throw error
    }
}
