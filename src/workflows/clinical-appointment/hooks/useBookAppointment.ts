import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bookAppointmentSchema } from '@workflows/clinical-appointment/schemas/bookAppointment.schema'
import type {
    BookAppointmentFormType,
    SelectedSlot,
} from '@workflows/clinical-appointment/types/clinicalAppointment.model'
import { bookAppointment } from '@workflows/clinical-appointment/services/bookAppointment'
import { SLOT_INTERVAL } from '@workflows/clinical-appointment/config/config'

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
        onSuccess: () => {
            form.reset()
            queryClient.invalidateQueries({
                queryKey: ['appointments'],
            })
            onSuccess?.()
        },
    })

    const onSubmit = form.handleSubmit((data) => mutation.mutate(data))

    return { form, onSubmit, isSubmitting: mutation.isPending }
}
