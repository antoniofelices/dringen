import type { OrganizationType } from '@resources/organization/types/organization.model'
import { useOrganizationDetailsForm } from '@resources/organization/hooks/useOrganizationDetailsForm'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import content from './OrganizationDetails.content'

const OrganizationDetailsForm = ({
    organization,
    onSuccess,
}: {
    organization: OrganizationType
    onSuccess: () => void
}) => {
    const { form, onSubmit } = useOrganizationDetailsForm({
        organization,
        onSuccess,
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="name"
                        label={content.labelName}
                        type="text"
                    />
                    <FormFieldInput
                        control={form.control}
                        fieldName="type"
                        label={content.labelType}
                        type="text"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="identifier"
                        label={content.labelIdentifier}
                        type="text"
                    />
                    <FormFieldInput
                        control={form.control}
                        fieldName="address"
                        label={content.labelAddress}
                        type="text"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="phone"
                        label={content.labelGeneralPhone}
                        type="tel"
                    />
                    <FormFieldInput
                        control={form.control}
                        fieldName="email"
                        label={content.labelGeneralEmail}
                        type="email"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="adminPhone"
                        label={content.labelAdminPhone}
                        type="tel"
                    />
                    <FormFieldInput
                        control={form.control}
                        fieldName="adminEmail"
                        label={content.labelAdminEmail}
                        type="email"
                    />
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

export default OrganizationDetailsForm
