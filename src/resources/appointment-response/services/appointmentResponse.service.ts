import type { AppointmentResponse } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const createAppointmentResponse = async (
    response: AppointmentResponse
): Promise<AppointmentResponse> => {
    try {
        await authenticateMedplum()

        return await medplum.createResource(response)
    } catch (error) {
        logger.error('Error creating appointment response in Server', error, {
            component: 'appointmentResponse.service',
            action: 'createAppointmentResponse',
        })
        throw error
    }
}

export const getAppointmentResponses = async (
    appointmentId: string
): Promise<AppointmentResponse[]> => {
    try {
        await authenticateMedplum()

        return await medplum.searchResources('AppointmentResponse', {
            appointment: `Appointment/${appointmentId}`,
        })
    } catch (error) {
        logger.error(
            'Error fetching appointment responses from Server',
            error,
            {
                component: 'appointmentResponse.service',
                action: 'getAppointmentResponses',
            }
        )
        throw error
    }
}
