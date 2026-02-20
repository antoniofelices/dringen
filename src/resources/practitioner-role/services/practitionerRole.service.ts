import type { PractitionerRole } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'
import type { PractitionerRoleInfo } from '@resources/practitioner-role/types/practitionerRole.model'

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

export const updatePractitionerRole = async (
    id: string,
    role: PractitionerRole
): Promise<PractitionerRole> => {
    try {
        await authenticateMedplum()

        return await medplum.updateResource({ ...role, id })
    } catch (error) {
        logger.error('Error updating practitioner role in Server', error, {
            component: 'practitionerRole.service',
            action: 'updatePractitionerRole',
        })
        throw error
    }
}

export const getPractitionerRoleByPractitioner = async (
    practitionerId: string
): Promise<PractitionerRole | undefined> => {
    try {
        await authenticateMedplum()

        const roles = await medplum.searchResources('PractitionerRole', {
            practitioner: `Practitioner/${practitionerId}`,
        })

        return roles[0]
    } catch (error) {
        logger.error('Error fetching practitioner role from Server', error, {
            component: 'practitionerRole.service',
            action: 'getPractitionerRoleByPractitioner',
        })
        throw error
    }
}
