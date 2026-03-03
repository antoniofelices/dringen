import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { CirclePlus, Trash2 } from 'lucide-react'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import FormFieldSelect from '@shared/components/ui/FormFieldSelect'
import type { OptionType } from '@shared/types/FormFieldCombobox.model'
import type { PractitionerDetailsFormType } from '@resources/practitioner/types/practitioner.model'
import { practitionerDetailsSchema } from '@resources/practitioner/schemas/practitionerDetails.schema'
import { useUpdatePractitionerDetails } from '@resources/practitioner/hooks/useUpdatePractitionerDetails'
import content from './PractitionerDetails.content'

const daysOfWeekOptions = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

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
    const updateDetails = useUpdatePractitionerDetails(
        practitionerId,
        hospitalId
    )

    const form = useForm<PractitionerDetailsFormType>({
        resolver: zodResolver(practitionerDetailsSchema),
        defaultValues,
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'availableTime',
    })

    const addTimeHandler = () => {
        append({ daysOfWeek: '', startTime: '', endTime: '' })
    }

    const removeTimeHandler = (index: number) => {
        remove(index)
    }

    const onSubmit = async (formData: PractitionerDetailsFormType) => {
        try {
            await updateDetails.mutateAsync(formData)
        } catch {
            toast.error(content.textToastFail)
            return
        }
        toast.success(content.textToastSuccess)
        onSuccess()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                options={daysOfWeekOptions}
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
