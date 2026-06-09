import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldSelect from '@shared/components/ui/FormFieldSelect'
import FormFieldSwitch from '@shared/components/ui/FormFieldSwitch'
import FormFieldTextarea from '@shared/components/ui/FormFieldTextarea'
import {
    RELATIONSHIP_OPTIONS,
    FAMILY_MEMBER_HISTORY_STATUS_OPTIONS,
} from '@shared/fhir/valueSets.domain'
import type { FamilyMemberHistoryFormProps } from '@resources/family-member-history/types/familyMemberHistory.model'
import { useFamilyMemberHistoryForm } from '@resources/family-member-history/hooks/useFamilyMemberHistoryForm'
import { contentES as content } from './FamilyMemberHistoryForm.content'

const FamilyMemberHistoryForm = ({
    patientId,
    historyData,
    mode,
    onSuccess,
}: FamilyMemberHistoryFormProps) => {
    const { form, onSubmit, noKnownFamilyHistory } = useFamilyMemberHistoryForm(
        {
            patientId,
            historyData,
            mode,
            onSuccess,
        }
    )

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                <FormFieldSwitch
                    control={form.control}
                    fieldName="noKnownFamilyHistory"
                    label={content.labelNoKnownFamilyHistory}
                    description={content.descriptionNoKnownFamilyHistory}
                />
                <fieldset disabled={noKnownFamilyHistory}>
                    <div className="grid grid-cols-3 gap-4">
                        <FormFieldSelect
                            control={form.control}
                            fieldName="relationship"
                            label={content.labelRelationship}
                            options={RELATIONSHIP_OPTIONS}
                            placeholder={content.placeholderSelect}
                        />
                        <FormFieldSelect
                            control={form.control}
                            fieldName="status"
                            label={content.labelStatus}
                            options={FAMILY_MEMBER_HISTORY_STATUS_OPTIONS}
                            placeholder={content.placeholderSelect}
                        />
                        <FormFieldInput
                            control={form.control}
                            fieldName="condition"
                            label={content.labelCondition}
                            placeholder={content.placeholderCondition}
                        />
                    </div>
                    <FormFieldSwitch
                        control={form.control}
                        fieldName="deceasedBoolean"
                        label={content.labelDeceased}
                        description={content.descriptionDeceased}
                    />
                </fieldset>
                <FormFieldTextarea
                    control={form.control}
                    fieldName="note"
                    label={content.labelNote}
                    placeholder={content.placeholderNote}
                />
                <Button
                    type="submit"
                    size="sm"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting
                        ? content.textButtonSaving
                        : content.textButtonSave}
                </Button>
            </form>
        </Form>
    )
}

export default FamilyMemberHistoryForm
