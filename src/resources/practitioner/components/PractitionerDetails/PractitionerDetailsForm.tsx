import { CirclePlus, Trash2 } from 'lucide-react'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import FormFieldSelect from '@shared/components/ui/FormFieldSelect'
import type { OptionType } from '@shared/types/FormFieldCombobox.model'
import type { PractitionerDetailsFormType } from '@resources/practitioner/types/practitioner.model'
import { DAYS_OF_WEEK_OPTIONS } from '@shared/fhir/valueSets.domain'
import { usePractitionerDetailsForm } from '@resources/practitioner/hooks/usePractitionerDetailsForm'
import { contentES as content } from './PractitionerDetails.content'

const PractitionerDetailsForm = ({
    practitionerId,
    hospitalId,
    defaultValues,
    outpatientOptions,
    onSuccess,
}: {
    practitionerId: string
    hospitalId: string
    defaultValues: PractitionerDetailsFormType
    outpatientOptions: OptionType[]
    onSuccess: () => void
}) => {
    const { form, fields, addTimeHandler, removeTimeHandler, onSubmit } =
        usePractitionerDetailsForm({
            practitionerId,
            hospitalId,
            defaultValues,
            outpatientOptions,
            onSuccess,
        })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldInput
                    control={form.control}
                    fieldName="phone"
                    label={content.labelPhone}
                    type="tel"
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="email"
                    label={content.labelEmail}
                    type="email"
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="specialty"
                    label={content.labelSpecialty}
                    type="text"
                />
                <FormFieldCombobox
                    control={form.control}
                    fieldName="outpatientFacility"
                    label={content.labelOutpatientFacility}
                    options={outpatientOptions}
                />
                <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">
                        {content.labelAvailableTime}
                    </h3>
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="flex gap-4 justify-between items-center mt-2"
                        >
                            <FormFieldSelect
                                className="w-full"
                                control={form.control}
                                fieldName={`availableTime.${index}.daysOfWeek`}
                                label={content.labelDaysOfWeek}
                                options={DAYS_OF_WEEK_OPTIONS}
                                placeholder={content.labelDaysOfWeek}
                            />
                            <FormFieldInput
                                className="w-full"
                                control={form.control}
                                fieldName={`availableTime.${index}.startTime`}
                                label={content.labelStartTime}
                                type="time"
                            />
                            <FormFieldInput
                                className="w-full"
                                control={form.control}
                                fieldName={`availableTime.${index}.endTime`}
                                label={content.labelEndTime}
                                type="time"
                            />
                            <div className="flex items-center gap-2 mt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addTimeHandler}
                                >
                                    <CirclePlus size={16} />
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeTimeHandler(index)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {fields.length === 0 && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addTimeHandler}
                            className="mt-2"
                        >
                            <CirclePlus size={16} />
                            {content.textButtonAddTime}
                        </Button>
                    )}
                </div>
                <Button
                    type="submit"
                    className="mt-4"
                    size="sm"
                    disabled={
                        !form.formState.isDirty || form.formState.isSubmitting
                    }
                >
                    {form.formState.isSubmitting
                        ? content.textButtonSending
                        : content.textButtonSend}
                </Button>
            </form>
        </Form>
    )
}

export default PractitionerDetailsForm
