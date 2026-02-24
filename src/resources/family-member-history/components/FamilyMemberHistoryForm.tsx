import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import type {
    FamilyMemberHistoryFormType,
    FamilyMemberHistoryFormProps,
} from '@resources/family-member-history/types/familyMemberHistory.model'
import { familyMemberHistorySchema } from '@resources/family-member-history/schemas/familyMemberHistory.schema'
import { useCreateFamilyMemberHistory } from '@resources/family-member-history/hooks/useCreateFamilyMemberHistory'
import { useUpdateFamilyMemberHistory } from '@resources/family-member-history/hooks/useUpdateFamilyMemberHistory'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import FormFieldSwitch from '@shared/components/ui/FormFieldSwitch'
import FormFieldTextarea from '@shared/components/ui/FormFieldTextarea'
import content from './FamilyMemberHistoryForm.content'

const FamilyMemberHistoryForm = ({
    patientId,
    historyData,
    mode,
    onSuccess,
}: FamilyMemberHistoryFormProps) => {
    const createMutation = useCreateFamilyMemberHistory(patientId)
    const updateMutation = useUpdateFamilyMemberHistory(
        historyData?.id ?? '',
        patientId
    )

    const isNoKnownHistory =
        historyData?.condition === 'No family history of disorder'

    const form = useForm<FamilyMemberHistoryFormType>({
        resolver: zodResolver(familyMemberHistorySchema),
        defaultValues: {
            noKnownFamilyHistory: isNoKnownHistory,
            relationship: isNoKnownHistory
                ? ''
                : (findRelationshipCode(historyData?.relationship) ?? ''),
            condition: isNoKnownHistory ? '' : (historyData?.condition ?? ''),
            status:
                (historyData?.status as FamilyMemberHistoryFormType['status']) ||
                'health-unknown',
            deceasedBoolean: historyData?.deceasedBoolean ?? false,
            note: historyData?.note || undefined,
        },
    })

    const noKnownFamilyHistory = form.watch('noKnownFamilyHistory')

    const onSubmit = async (formData: FamilyMemberHistoryFormType) => {
        try {
            if (mode === 'create') {
                await createMutation.mutateAsync(formData)
            } else {
                await updateMutation.mutateAsync(formData)
            }
        } catch {
            toast.error(content.textToastFail)
            return
        }
        toast.success(content.textToastSuccess)
        onSuccess()
    }

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
                        <FormFieldCombobox
                            control={form.control}
                            fieldName="relationship"
                            label={content.labelRelationship}
                            placeholder={content.placeholderSelect}
                            options={content.relationshipOptions}
                        />
                        <FormFieldCombobox
                            control={form.control}
                            fieldName="status"
                            label={content.labelStatus}
                            placeholder={content.placeholderSelect}
                            options={content.statusOptions}
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

function findRelationshipCode(display: string | undefined): string {
    if (!display) return ''
    const match = content.relationshipOptions.find(
        (opt) => opt.label === display
    )
    return match?.value ?? ''
}

export default FamilyMemberHistoryForm
