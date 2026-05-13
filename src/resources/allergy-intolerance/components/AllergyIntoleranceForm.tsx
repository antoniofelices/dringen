import type { AllergyIntoleranceFormProps } from '@resources/allergy-intolerance/types/allergyIntolerance.model'
import { useAllergyIntoleranceForm } from '@resources/allergy-intolerance/hooks/useAllergyIntoleranceForm'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldCalendar from '@shared/components/ui/FormFieldCalendar'
import FormFieldSelect from '@/shared/components/ui/FormFieldSelect'
import FormFieldSwitch from '@shared/components/ui/FormFieldSwitch'
import FormFieldTextarea from '@shared/components/ui/FormFieldTextarea'
import content from './AllergyIntoleranceForm.content'

const AllergyIntoleranceForm = ({
    patientId,
    allergyData,
    mode,
    onSuccess,
}: AllergyIntoleranceFormProps) => {
    const { form, onSubmit, noKnownAllergies } = useAllergyIntoleranceForm({
        patientId,
        allergyData,
        mode,
        onSuccess,
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                <FormFieldSwitch
                    control={form.control}
                    fieldName="noKnownAllergies"
                    label={content.labelNoKnownAllergies}
                    description={content.descriptionNoKnownAllergies}
                />
                <fieldset disabled={noKnownAllergies}>
                    <div className="grid grid-cols-3 gap-4">
                        <FormFieldInput
                            control={form.control}
                            fieldName="substance"
                            label={content.labelSubstance}
                            placeholder={content.placeholderSubstance}
                        />
                        <FormFieldSelect
                            control={form.control}
                            fieldName="type"
                            label={content.labelType}
                            placeholder={content.placeholderSelect}
                            options={content.typeOptions}
                        />
                        <FormFieldSelect
                            control={form.control}
                            fieldName="category"
                            label={content.labelCategory}
                            placeholder={content.placeholderSelect}
                            options={content.categoryOptions}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <FormFieldSelect
                            control={form.control}
                            fieldName="criticality"
                            label={content.labelCriticality}
                            placeholder={content.placeholderSelect}
                            options={content.criticalityOptions}
                        />
                        <FormFieldInput
                            control={form.control}
                            fieldName="manifestation"
                            label={content.labelManifestation}
                            placeholder={content.placeholderManifestation}
                        />
                        <FormFieldSelect
                            control={form.control}
                            fieldName="severity"
                            label={content.labelSeverity}
                            placeholder={content.placeholderSelect}
                            options={content.severityOptions}
                        />
                    </div>
                </fieldset>
                <div className="grid grid-cols-3 gap-4">
                    <FormFieldCalendar
                        control={form.control}
                        fieldName="onsetDateTime"
                        label={content.labelOnsetDateTime}
                    />
                    <FormFieldSelect
                        control={form.control}
                        fieldName="clinicalStatus"
                        label={content.labelClinicalStatus}
                        placeholder={content.placeholderSelect}
                        options={content.clinicalStatusOptions}
                    />
                    <FormFieldSelect
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
