import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldCalendar from '@shared/components/ui/FormFieldCalendar'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldSelect from '@shared/components/ui/FormFieldSelect'
import { useAddNewAppointmentFormByPatient } from '@resources/appointment/hooks/useAddNewAppointmentFormByPatient'
import type { AddNewAppointmentFormByPatientProps } from '@resources/appointment/types/appointment.model'
import content from './AddNewAppointmentFormByPatient.content'

const AddNewAppointmentFormByPatient = ({
    patientId,
    onSuccess,
}: AddNewAppointmentFormByPatientProps) => {
    const {
        form,
        onSubmit,
        isSubmitting,
        physicianOptions,
        slotOptions,
        isDateDisabled,
    } = useAddNewAppointmentFormByPatient({ patientId, onSuccess })

    return (
        <Form {...form}>
            <form onSubmit={onSubmit}>
                <FormFieldCombobox
                    control={form.control}
                    textCommandEmpty={content.textNoCommandPhysicianFound}
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
                        disabled={isDateDisabled}
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
    )
}

export default AddNewAppointmentFormByPatient
