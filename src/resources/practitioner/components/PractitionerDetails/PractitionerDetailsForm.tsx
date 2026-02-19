import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import type { PractitionerDetailsFormType } from '@resources/practitioner/types/practitioner.model'
import { practitionerDetailsSchema } from '@resources/practitioner/schemas/practitionerDetails.schema'
import { useUpdatePractitionerDetails } from '@resources/practitioner/hooks/useUpdatePractitionerDetails'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import content from './PractitionerDetails.content'

type OutpatientOption = {
    label: string
    value: string
}

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
    outpatientOptions: OutpatientOption[]
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
                <Button
                    type="submit"
                    className="mt-4"
                    size="sm"
                    disabled={form.formState.isSubmitting}
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
