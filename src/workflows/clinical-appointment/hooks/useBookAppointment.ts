import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Slot } from '@medplum/fhirtypes'
import { bookAppointmentSchema } from '@workflows/clinical-appointment/schemas/bookAppointment.schema'
import type { BookAppointmentFormType } from '@workflows/clinical-appointment/types/clinicalAppointment.model'

const defaultValues: BookAppointmentFormType = {
    patient: '',
    slotId: '',
    notes: '',
}

export const useBookAppointment = (slots: Slot[], onSuccess?: () => void) => {
    const form = useForm<BookAppointmentFormType>({
        resolver: zodResolver(bookAppointmentSchema),
        defaultValues,
    })

    const onSubmit = () => {}

    return { form, onSubmit }
}
