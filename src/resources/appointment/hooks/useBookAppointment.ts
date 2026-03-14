import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Appointment } from '@medplum/fhirtypes'
import { SLOT_INTERVAL } from '@resources/appointment/config/config'
import { bookAppointmentSchema } from '@resources/appointment/schemas/bookAppointment.schema'
import { bookAppointment } from '@resources/appointment/services/bookAppointment'
import type {
    BookAppointmentFormType,
    SelectedSlot,
} from '@resources/appointment/types/appointment.model'
import content from '@resources/appointment/hooks/useBookAppointment.content'

const defaultValues: BookAppointmentFormType = {
    patient: '',
    notes: '',
}

export const useBookAppointment = (
    practitionerId: string,
    selected: SelectedSlot,
    onSuccess?: () => void
) => {
    const form = useForm<BookAppointmentFormType>({
        resolver: zodResolver(bookAppointmentSchema),
        defaultValues,
    })

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (data: BookAppointmentFormType) => {
            if (!selected) throw new Error('No slot selected')

            const startDate = new Date(selected.date)
            const [h, m] = selected.slot.split(':').map(Number)
            startDate.setHours(h, m, 0, 0)

            const endDate = new Date(startDate)
            endDate.setMinutes(endDate.getMinutes() + SLOT_INTERVAL)

            return bookAppointment(
                startDate.toISOString(),
                endDate.toISOString(),
                data.patient,
                practitionerId,
                data.notes
            )
        },
        onSuccess: (createdAppointment) => {
            form.reset()
            queryClient.setQueryData<Appointment[]>(
                ['appointments', practitionerId],
                (old = []) => [...old, createdAppointment]
            )
            queryClient.invalidateQueries({ queryKey: ['appointmentsByPractitioner'] })
            queryClient.invalidateQueries({ queryKey: ['listAppointments'] })
            queryClient.invalidateQueries({ queryKey: ['appointmentsByPatient'] })
            toast.success(content.textToastSuccess)
            onSuccess?.()
        },
        onError: () => {
            toast.error(content.textToastError)
        },
    })

    const onSubmit = form.handleSubmit((data) => mutation.mutate(data))

    return { form, onSubmit, isSubmitting: mutation.isPending }
}
