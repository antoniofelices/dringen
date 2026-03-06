import type { Appointment, Slot } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const bookAppointment = async (
    slot: Slot,
    patientId: string,
    practitionerId: string,
    notes?: string
): Promise<Appointment> => {
    try {
        await authenticateMedplum()

        const appointment: Appointment = {
            resourceType: 'Appointment',
            status: 'booked',
            start: slot.start,
            end: slot.end,
            slot: [{ reference: `Slot/${slot.id}` }],
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

        const createdAppointment = await medplum.createResource(appointment)

        await medplum.updateResource({
            ...slot,
            status: 'busy',
        })

        return createdAppointment
    } catch (error) {
        logger.error('Error booking appointment', error, {
            component: 'clinicalAppointment.service',
            action: 'bookAppointment',
        })
        throw error
    }
}
