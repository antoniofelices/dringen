import type { Appointment } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const createAppointment = async (
    appointment: Appointment
): Promise<Appointment> => {
    try {
        await authenticateMedplum()

        return await medplum.createResource(appointment)
    } catch (error) {
        logger.error('Error creating appointment in Server', error, {
            component: 'appointment.service',
            action: 'createAppointment',
        })
        throw error
    }
}

export const updateAppointment = async (
    id: string,
    appointment: Appointment
): Promise<Appointment> => {
    try {
        await authenticateMedplum()

        return await medplum.updateResource({ ...appointment, id })
    } catch (error) {
        logger.error('Error updating appointment in Server', error, {
            component: 'appointment.service',
            action: 'updateAppointment',
        })
        throw error
    }
}
