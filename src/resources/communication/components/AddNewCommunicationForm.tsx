import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldTextarea from '@shared/components/ui/FormFieldTextarea'
import FormFieldCalendar from '@shared/components/ui/FormFieldCalendar'
import { useAddNewCommunicationForm } from '@resources/communication/hooks/useAddNewCommunicationForm'
import type { AddNewCommunicationFormProps } from '@resources/communication/types/communication.model'
import content from './AddNewCommunicationForm.content'

const AddNewCommunicationForm = ({
    onSuccess,
}: AddNewCommunicationFormProps) => {
    const { form, onSubmit } = useAddNewCommunicationForm({ onSuccess })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldInput
                    control={form.control}
                    fieldName="title"
                    label={content.labelTitle}
                    type="text"
                />
                <FormFieldTextarea
                    control={form.control}
                    fieldName="content"
                    label={content.labelContent}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldCalendar
                        control={form.control}
                        fieldName="startDate"
                        label={content.labelStartDate}
                    />
                    <FormFieldCalendar
                        control={form.control}
                        fieldName="endDate"
                        label={content.labelEndDate}
                    />
                </div>
                <FormFieldInput
                    control={form.control}
                    fieldName="location"
                    label={content.labelLocation}
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

export default AddNewCommunicationForm
