import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Appointment } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { updateAppointment } from '@resources/appointment/services/appointment.service'
import { CALLED_EXTENSION_URL } from '@resources/appointment/config/config'
import content from './useToggleAppointmentCalled.content'

export const useToggleAppointmentCalled = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({
            appointmentId,
            called,
        }: {
            appointmentId: string
            called: boolean
        }) => {
            await authenticateMedplum()
            const appointment = await medplum.readResource(
                'Appointment',
                appointmentId
            )
            const extensions = (appointment.extension ?? []).filter(
                (e) => e.url !== CALLED_EXTENSION_URL
            )
            const updated: Appointment = {
                ...appointment,
                extension: [
                    ...extensions,
                    { url: CALLED_EXTENSION_URL, valueBoolean: called },
                ],
            }
            return updateAppointment(appointmentId, updated)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['listAppointments'] })
            toast.success(content.textToastSuccess)
        },
        onError: () => {
            toast.error(content.textToastError)
        },
    })

    const toggleCalled = (appointmentId: string, called: boolean) => {
        mutation.mutate({ appointmentId, called })
    }

    return { toggleCalled, isPending: mutation.isPending }
}
