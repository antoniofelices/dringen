import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerAppointments } from '@/services/supabaseService'
import mapSupabaseError from '@/services/mapSupabaseErrors'
import type { PostgrestError } from '@supabase/supabase-js'
import { usePatientsNames } from '@/hooks/usePatients'
import { usePhysicians } from '@hooks/useUsers'
import { Button } from '@components/ui/base/button'
import { Form } from '@components/ui/base/form'
import FormFieldCalendar from '@/components/ui/FormFieldCalendar'
import FormFieldCombobox from '@components/ui/FormFieldCombobox'
import FormFieldInput from '@components/ui/FormFieldInput'
import content from '@data/patient/registerAppointmentForm'

const registetAppointmentSchema = z.object({
    patient: z.string().min(1, content.errorPatientRequired),
    physician: z.string().min(1, content.errorPhysicianRequired),
    appointmentDate: z.date(),
    appointmentTime: z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, content.errorInvalidTime),
    notes: z.string().optional(),
})

type FormData = z.infer<typeof registetAppointmentSchema>

type RegisterAppointmentFormProps = {
    onSuccess?: () => void
    initialDate?: Date | null
}

const RegisterAppointmentForm = ({
    onSuccess,
    initialDate,
}: RegisterAppointmentFormProps) => {
    const patients = usePatientsNames()
    const physicians = usePhysicians()

    const defaultValues = {
        patient: '',
        physician: '',
        appointmentDate: initialDate || new Date(),
        appointmentTime: '10:00',
        notes: '',
    }

    const form = useForm<FormData>({
        resolver: zodResolver(registetAppointmentSchema),
        defaultValues: defaultValues,
    })

    useEffect(() => {
        if (initialDate) {
            form.setValue('appointmentDate', initialDate)
        }
    }, [initialDate, form])

    const onSubmit = async (formData: FormData) => {
        const dateOnly = format(formData.appointmentDate, 'yyyy-MM-dd')
        const dateComplete = `${dateOnly}T${formData.appointmentTime}:00`

        try {
            await registerAppointments(
                formData.patient,
                formData.physician,
                dateComplete,
                formData.notes
            )
            toast.success(content.textToastSuccess)
            form.reset()
            onSuccess?.()
        } catch (error) {
            const postgrestError = error as PostgrestError
            const { field, message } = mapSupabaseError(postgrestError.message)
            form.setError(field as keyof FormData, {
                type: 'server',
                message,
            })
            toast.error(`${content.textToastFail} ${message}`)
            return
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldCombobox
                    control={form.control}
                    textCommandEmpty={content.textNoCommandPatientFound}
                    fieldName="patient"
                    label={content.labelPatient}
                    placeholder={content.placeholderPatient}
                    options={patients.map((p) => ({
                        label: `${p.name} - ${p.dni}`,
                        value: p.id,
                    }))}
                />
                <FormFieldCombobox
                    control={form.control}
                    textCommandEmpty={content.textNoCommandPhysicianFound}
                    fieldName="physician"
                    label={content.labelPhysician}
                    placeholder={content.placeholderPhysician}
                    options={physicians.map((p) => ({
                        label: `${p.name}`,
                        value: p.id,
                    }))}
                />
                <FormFieldCalendar
                    control={form.control}
                    fieldName="appointmentDate"
                    label={content.labelDate}
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="appointmentTime"
                    label={content.labelTime}
                    type="time"
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="notes"
                    label={content.labelNotes}
                    type="text"
                />
                <Button type="submit" className="w-full mt-4">
                    {form.formState.isSubmitting
                        ? content.textButtonSending
                        : content.textButtonSend}
                </Button>
            </form>
            {form.formState.errors.root && (
                <div className="text-red text-sm mt-2 text-center">
                    {form.formState.errors.root.message}
                </div>
            )}
        </Form>
    )
}

export default RegisterAppointmentForm
