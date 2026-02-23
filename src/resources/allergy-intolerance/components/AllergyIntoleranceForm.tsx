import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import type {
    AllergyIntoleranceType,
    AllergyIntoleranceFormType,
} from '@resources/allergy-intolerance/types/allergyIntolerance.model'
import { allergyIntoleranceSchema } from '@resources/allergy-intolerance/schemas/allergyIntolerance.schema'
import { useCreateAllergyIntolerance } from '@resources/allergy-intolerance/hooks/useCreateAllergyIntolerance'
import { useUpdateAllergyIntolerance } from '@resources/allergy-intolerance/hooks/useUpdateAllergyIntolerance'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import FormFieldSwitch from '@shared/components/ui/FormFieldSwitch'
import FormFieldTextarea from '@shared/components/ui/FormFieldTextarea'
import content from './AllergyIntoleranceForm.content'

type AllergyIntoleranceFormProps = {
    patientId: string
    allergyData?: AllergyIntoleranceType
    mode: 'create' | 'edit'
    onSuccess: () => void
}

const AllergyIntoleranceForm = ({
    patientId,
    allergyData,
    mode,
    onSuccess,
}: AllergyIntoleranceFormProps) => {
    const createMutation = useCreateAllergyIntolerance(patientId)
    const updateMutation = useUpdateAllergyIntolerance(
        allergyData?.id ?? '',
        patientId
    )

    const isNoKnownAllergy = allergyData?.substance === 'No known allergy'

    const form = useForm<AllergyIntoleranceFormType>({
        resolver: zodResolver(allergyIntoleranceSchema),
        defaultValues: {
            noKnownAllergies: isNoKnownAllergy,
            substance: isNoKnownAllergy ? '' : allergyData?.substance ?? '',
            type:
                (allergyData?.type as AllergyIntoleranceFormType['type']) ||
                undefined,
            category:
                (allergyData?.category as AllergyIntoleranceFormType['category']) ||
                undefined,
            criticality:
                (allergyData?.criticality as AllergyIntoleranceFormType['criticality']) ||
                undefined,
            clinicalStatus:
                (allergyData?.clinicalStatus as AllergyIntoleranceFormType['clinicalStatus']) ||
                'active',
            verificationStatus:
                (allergyData?.verificationStatus as AllergyIntoleranceFormType['verificationStatus']) ||
                undefined,
            onsetDateTime: allergyData?.onsetDateTime || undefined,
            manifestation: allergyData?.manifestation || undefined,
            severity:
                (allergyData?.severity as AllergyIntoleranceFormType['severity']) ||
                undefined,
            note: allergyData?.note || undefined,
        },
    })

    const noKnownAllergies = form.watch('noKnownAllergies')

    const onSubmit = async (formData: AllergyIntoleranceFormType) => {
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldSwitch
                    control={form.control}
                    fieldName="noKnownAllergies"
                    label={content.labelNoKnownAllergies}
                    description={content.descriptionNoKnownAllergies}
                />
                <fieldset disabled={noKnownAllergies}>
                    <div className="grid grid-cols-2 gap-4">
                        <FormFieldInput
                            control={form.control}
                            fieldName="substance"
                            label={content.labelSubstance}
                            placeholder={content.placeholderSubstance}
                        />
                        <FormFieldCombobox
                            control={form.control}
                            fieldName="type"
                            label={content.labelType}
                            placeholder={content.placeholderSelect}
                            options={content.typeOptions}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormFieldCombobox
                            control={form.control}
                            fieldName="category"
                            label={content.labelCategory}
                            placeholder={content.placeholderSelect}
                            options={content.categoryOptions}
                        />
                        <FormFieldCombobox
                            control={form.control}
                            fieldName="criticality"
                            label={content.labelCriticality}
                            placeholder={content.placeholderSelect}
                            options={content.criticalityOptions}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormFieldInput
                            control={form.control}
                            fieldName="manifestation"
                            label={content.labelManifestation}
                            placeholder={content.placeholderManifestation}
                        />
                        <FormFieldCombobox
                            control={form.control}
                            fieldName="severity"
                            label={content.labelSeverity}
                            placeholder={content.placeholderSelect}
                            options={content.severityOptions}
                        />
                    </div>
                    <FormFieldInput
                        control={form.control}
                        fieldName="onsetDateTime"
                        label={content.labelOnsetDateTime}
                        type="date"
                    />
                </fieldset>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldCombobox
                        control={form.control}
                        fieldName="clinicalStatus"
                        label={content.labelClinicalStatus}
                        placeholder={content.placeholderSelect}
                        options={content.clinicalStatusOptions}
                    />
                    <FormFieldCombobox
                        control={form.control}
                        fieldName="verificationStatus"
                        label={content.labelVerificationStatus}
                        placeholder={content.placeholderSelect}
                        options={content.verificationStatusOptions}
                    />
                </div>
                <FormFieldTextarea
                    control={form.control}
                    fieldName="note"
                    label={content.labelNote}
                    placeholder={content.placeholderNote}
                />
                <Button
                    type="submit"
                    className="mt-4"
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

export default AllergyIntoleranceForm
