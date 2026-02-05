import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
// import { format } from 'date-fns'
// import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// import { usePatientsNames } from '@/hooks/usePatients'
// import { usePhysicians } from '@hooks/useUsers'
// import { useLogger } from '@shared/hooks/useLogger'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldCalendar from '@shared/components/ui/FormFieldCalendar'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import content from './AddNewAppointmentForm.content'
import { addNewAppointmentSchema } from '@resources/appointment/schemas/addNewAppointment.schema'

type FormData = z.infer<typeof addNewAppointmentSchema>

type RegisterAppointmentFormProps = {
    onSuccess?: () => void
    initialDate?: Date | null
}

const AddNewAppointmentForm = ({
    onSuccess,
    initialDate,
}: RegisterAppointmentFormProps) => {
    // const { logError, logSuccess } = useLogger('RegisterAppointmentFormProps')
    // const patients = usePatientsNames()
    // const physicians = usePhysicians()

    const defaultValues = {
        patient: '',
        physician: '',
        appointmentDate: initialDate || new Date(),
        appointmentTime: '10:00',
        notes: '',
    }

    const form = useForm<FormData>({
        resolver: zodResolver(addNewAppointmentSchema),
        defaultValues: defaultValues,
    })

    useEffect(() => {
        if (initialDate) {
            form.setValue('appointmentDate', initialDate)
        }
    }, [initialDate, form])

    const onSubmit = () => {
        return
    }

    // const onSubmit = async (formData: FormData) => {
    //     const dateOnly = format(formData.appointmentDate, 'yyyy-MM-dd')
    //     const dateComplete = `${dateOnly}T${formData.appointmentTime}:00`

    //     try {
    //         await registerAppointment(
    //             formData.patient,
    //             formData.physician,
    //             dateComplete,
    //             formData.notes
    //         )
    //         toast.success(content.textToastSuccess)
    //         logSuccess(content.textToastSuccess, content.title)
    //         form.reset()
    //         onSuccess?.()
    //     } catch (error) {
    //         toast.error(`${content.textToastFail}`)
    //         logError(content.textToastFail, error, content.title)
    //         return
    //     }
    // }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldCombobox
                    control={form.control}
                    textCommandEmpty={content.textNoCommandPatientFound}
                    fieldName="patient"
                    label={content.labelPatient}
                    placeholder={content.placeholderPatient}
                    options={[
                        { label: 'patient-1', value: 'patient-1' },
                        { label: 'patient-2', value: 'patient-2' },
                    ]}
                />
                <FormFieldCombobox
                    control={form.control}
                    textCommandEmpty={content.textNoCommandPhysicianFound}
                    fieldName="physician"
                    label={content.labelPhysician}
                    placeholder={content.placeholderPhysician}
                    options={[
                        { label: 'physician-1', value: 'physician-1' },
                        { label: 'physician-2', value: 'physician-2' },
                    ]}
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

export default AddNewAppointmentForm
