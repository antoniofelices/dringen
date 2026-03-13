import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldCalendar from '@shared/components/ui/FormFieldCalendar'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldSelect from '@shared/components/ui/FormFieldSelect'
import { useAddNewAppointmentForm } from '@resources/appointment/hooks/useAddNewAppointmentForm'
import content from './AddNewAppointmentForm.content'

type AddNewAppointmentFormProps = {
    onSuccess?: () => void
    initialDate?: Date | null
}

const AddNewAppointmentForm = ({
    onSuccess,
    initialDate,
}: AddNewAppointmentFormProps) => {
    const {
        form,
        onSubmit,
        isSubmitting,
        patientOptions,
        physicianOptions,
        slotOptions,
    } = useAddNewAppointmentForm({ initialDate, onSuccess })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={onSubmit}>
                        <FormFieldCombobox
                            control={form.control}
                            textCommandEmpty={content.textNoCommandPatientFound}
                            fieldName="patient"
                            label={content.labelPatient}
                            placeholder={content.placeholderPatient}
                            options={patientOptions}
                        />
                        <FormFieldCombobox
                            control={form.control}
                            textCommandEmpty={
                                content.textNoCommandPhysicianFound
                            }
                            fieldName="physician"
                            label={content.labelPhysician}
                            placeholder={content.placeholderPhysician}
                            options={physicianOptions}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormFieldCalendar
                                control={form.control}
                                fieldName="appointmentDate"
                                label={content.labelDate}
                            />
                            <FormFieldSelect
                                control={form.control}
                                fieldName="appointmentTime"
                                label={content.labelTime}
                                placeholder={content.placeholderTime}
                                options={slotOptions}
                            />
                        </div>
                        <FormFieldInput
                            control={form.control}
                            fieldName="notes"
                            label={content.labelNotes}
                            type="text"
                        />
                        <Button type="submit" className="w-full mt-4">
                            {isSubmitting
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
            </CardContent>
        </Card>
    )
}

export default AddNewAppointmentForm
