import { useForm } from 'react-hook-form'
import { registerAppointments } from '@/services/supabaseService'
import mapSupabaseError from '@/services/mapSupabaseErrors'
import type { PostgrestError } from '@supabase/supabase-js'
import { usePatientsNames } from '@/hooks/usePatients'
import { usePhysicians } from '@hooks/useUsers'
import { Button } from '@components/ui/base/button'
import { Form } from '@components/ui/base/form'
import FormFieldCalendar from '@/components/ui/FormFieldCalendar'
import FormFieldInput from '@components/ui/FormFieldInput'
import FormFieldSelectArray from '@/components/ui/FormFieldSelectArray'
import content from '@data/patient/registerAppointmentForm'

type FormData = {
    patient: { label: string; value: string } | null
    physician: { label: string; value: string } | null
    appointmentDate: Date
    notes?: string
}

const RegisterAppointmentForm = () => {
    const defaultValues = {
        patient: null,
        physician: null,
        appointmentDate: new Date(),
        notes: '',
    }

    const form = useForm<FormData>({
        defaultValues: defaultValues,
    })

    const onSubmit = async (formData: FormData) => {
        if (!formData.patient?.value) {
            form.setError('patient', {
                type: 'required',
                message: 'Please select a patient',
            })
            return
        }

        if (!formData.physician?.value) {
            form.setError('physician', {
                type: 'required',
                message: 'Please select a physician',
            })
            return
        }

        try {
            await registerAppointments(
                formData.patient.value,
                formData.physician.value,
                formData.appointmentDate.toISOString(),
                formData.notes
            )
            form.reset()
        } catch (error) {
            const postgrestError = error as PostgrestError
            const { field, message } = mapSupabaseError(postgrestError.message)
            form.setError(field as keyof FormData, {
                type: 'server',
                message,
            })
            return
        }
    }

    const patients = usePatientsNames()
    const physicians = usePhysicians()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldSelectArray
                    control={form.control}
                    fieldName="patient"
                    label={content.labelPatient}
                    options={patients.map((p) => ({
                        label: `${p.name} (${p.dni})`,
                        value: p.id,
                    }))}
                />
                <FormFieldSelectArray
                    control={form.control}
                    fieldName="physician"
                    label={content.labelPhysician}
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
