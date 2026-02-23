import type { FamilyMemberHistory } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const getFamilyMemberHistoriesByPatient = async (
    patientId: string
): Promise<FamilyMemberHistory[]> => {
    try {
        await authenticateMedplum()

        return await medplum.searchResources('FamilyMemberHistory', {
            patient: `Patient/${patientId}`,
        })
    } catch (error) {
        logger.error(
            'Error fetching family member histories from Server',
            error,
            {
                component: 'familyMemberHistory.service',
                action: 'getFamilyMemberHistoriesByPatient',
            }
        )
        throw error
    }
}

export const getFamilyMemberHistoryById = async (
    id: string
): Promise<FamilyMemberHistory> => {
    try {
        await authenticateMedplum()

        return await medplum.readResource('FamilyMemberHistory', id)
    } catch (error) {
        logger.error(
            'Error fetching family member history from Server',
            error,
            {
                component: 'familyMemberHistory.service',
                action: 'getFamilyMemberHistoryById',
            }
        )
        throw error
    }
}

export const createFamilyMemberHistory = async (
    resource: FamilyMemberHistory
): Promise<FamilyMemberHistory> => {
    try {
        await authenticateMedplum()

        return await medplum.createResource(resource)
    } catch (error) {
        logger.error(
            'Error creating family member history in Server',
            error,
            {
                component: 'familyMemberHistory.service',
                action: 'createFamilyMemberHistory',
            }
        )
        throw error
    }
}

export const updateFamilyMemberHistory = async (
    id: string,
    resource: FamilyMemberHistory
): Promise<FamilyMemberHistory> => {
    try {
        await authenticateMedplum()

        return await medplum.updateResource({ ...resource, id })
    } catch (error) {
        logger.error(
            'Error updating family member history in Server',
            error,
            {
                component: 'familyMemberHistory.service',
                action: 'updateFamilyMemberHistory',
            }
        )
        throw error
    }
}
