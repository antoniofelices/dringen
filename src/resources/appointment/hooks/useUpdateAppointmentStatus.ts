import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Appointment } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { updateAppointment } from '@resources/appointment/services/appointment.service'
import content from './useUpdateAppointmentStatus.content'

export const useUpdateAppointmentStatus = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({
            appointmentId,
            newStatus,
        }: {
            appointmentId: string
            newStatus: string
        }) => {
            await authenticateMedplum()
            const appointment = await medplum.readResource(
                'Appointment',
                appointmentId
            )
            const updated: Appointment = {
                ...appointment,
                status: newStatus as Appointment['status'],
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

    const updateStatus = (appointmentId: string, newStatus: string) => {
        mutation.mutate({ appointmentId, newStatus })
    }

    return { updateStatus, isPending: mutation.isPending }
}
