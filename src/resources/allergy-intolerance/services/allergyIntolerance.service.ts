import type { AllergyIntolerance } from '@medplum/fhirtypes'
import { medplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const getAllergyIntolerancesByPatient = async (
    patientId: string
): Promise<AllergyIntolerance[]> => {
    try {
return await medplum.searchResources('AllergyIntolerance', {
            patient: `Patient/${patientId}`,
        })
    } catch (error) {
        logger.error(
            'Error fetching allergy intolerances from Server',
            error,
            {
                component: 'allergyIntolerance.service',
                action: 'getAllergyIntolerancesByPatient',
            }
        )
        throw error
    }
}

export const getAllergyIntoleranceById = async (
    id: string
): Promise<AllergyIntolerance> => {
    try {
return await medplum.readResource('AllergyIntolerance', id)
    } catch (error) {
        logger.error(
            'Error fetching allergy intolerance from Server',
            error,
            {
                component: 'allergyIntolerance.service',
                action: 'getAllergyIntoleranceById',
            }
        )
        throw error
    }
}

export const createAllergyIntolerance = async (
    resource: AllergyIntolerance
): Promise<AllergyIntolerance> => {
    try {
return await medplum.createResource(resource)
    } catch (error) {
        logger.error(
            'Error creating allergy intolerance in Server',
            error,
            {
                component: 'allergyIntolerance.service',
                action: 'createAllergyIntolerance',
            }
        )
        throw error
    }
}

export const updateAllergyIntolerance = async (
    id: string,
    resource: AllergyIntolerance
): Promise<AllergyIntolerance> => {
    try {
return await medplum.updateResource({ ...resource, id })
    } catch (error) {
        logger.error(
            'Error updating allergy intolerance in Server',
            error,
            {
                component: 'allergyIntolerance.service',
                action: 'updateAllergyIntolerance',
            }
        )
        throw error
    }
}
