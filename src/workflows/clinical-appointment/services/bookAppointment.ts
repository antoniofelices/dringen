import type { Appointment } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const getAppointmentsByPractitioner = async (
    practitionerId: string
): Promise<Appointment[]> => {
    try {
        await authenticateMedplum()

        return await medplum.searchResources('Appointment', {
            actor: `Practitioner/${practitionerId}`,
            status: 'booked',
            _count: '1000',
            _sort: 'date',
        })
    } catch (error) {
        logger.error('Error fetching appointments from Server', error, {
            component: 'clinicalAppointment.service',
            action: 'getAppointmentsByPractitioner',
        })
        throw error
    }
}

export const bookAppointment = async (
    start: string,
    end: string,
    patientId: string,
    practitionerId: string,
    notes?: string
): Promise<Appointment> => {
    try {
        await authenticateMedplum()

        const appointment: Appointment = {
            resourceType: 'Appointment',
            status: 'booked',
            start,
            end,
            participant: [
                {
                    actor: { reference: `Patient/${patientId}` },
                    status: 'accepted',
                },
                {
                    actor: { reference: `Practitioner/${practitionerId}` },
                    status: 'accepted',
                },
            ],
            ...(notes ? { description: notes } : {}),
        }

        return await medplum.createResource(appointment)
    } catch (error) {
        logger.error('Error booking appointment', error, {
            component: 'clinicalAppointment.service',
            action: 'bookAppointment',
        })
        throw error
    }
}
