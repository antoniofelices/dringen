import type { Patient } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const createPatient = async (patient: Patient): Promise<Patient> => {
    try {
        await authenticateMedplum()

        return await medplum.createResource(patient)
    } catch (error) {
        logger.error('Error creating patient in Medplum', error, {
            component: 'patient.service',
            action: 'createPatient',
        })
        throw error
    }
}

export const getListPatients = async (): Promise<Patient[]> => {
    try {
        await authenticateMedplum()

        const bundle = await medplum.searchResources('Patient', {
            _count: 1000,
        })

        return bundle
    } catch (error) {
        logger.error('Error fetching patients from Medplum', error, {
            component: 'patient.service',
            action: 'getListPatients',
        })
        throw error
    }
}
