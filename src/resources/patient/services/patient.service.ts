import type { Patient } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const createPatient = async (patient: Patient): Promise<Patient> => {
    try {
        await authenticateMedplum()

        return await medplum.createResource(patient)
    } catch (error) {
        logger.error('Error creating patient in Server', error, {
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
        logger.error('Error fetching patients from Server', error, {
            component: 'patient.service',
            action: 'getListPatients',
        })
        throw error
    }
}

export const getPatientsByPractitioner = async (
    practitionerId: string
): Promise<Patient[]> => {
    try {
        await authenticateMedplum()

        const bundle = await medplum.searchResources('Patient', {
            'general-practitioner': `Practitioner/${practitionerId}`,
            _count: 1000,
        })

        return bundle
    } catch (error) {
        logger.error('Error fetching patients by practitioner from Server', error, {
            component: 'patient.service',
            action: 'getPatientsByPractitioner',
        })
        throw error
    }
}

export const getSinglePatientById = async (id: string): Promise<Patient> => {
    try {
        await authenticateMedplum()

        return await medplum.readResource('Patient', id)
    } catch (error) {
        logger.error('Error fetching patient from Server', error, {
            component: 'patient.service',
            action: 'getSinglePatientById',
        })
        throw error
    }
}

export const updatePatient = async (
    id: string,
    patient: Patient
): Promise<Patient> => {
    try {
        await authenticateMedplum()

        return await medplum.updateResource({ ...patient, id })
    } catch (error) {
        logger.error('Error updating patient in Server', error, {
            component: 'patient.service',
            action: 'updatePatient',
        })
        throw error
    }
}
