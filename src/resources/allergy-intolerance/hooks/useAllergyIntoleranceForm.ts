import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import type {
    AllergyIntoleranceFormType,
    AllergyIntoleranceFormProps,
} from '@resources/allergy-intolerance/types/allergyIntolerance.model'
import { allergyIntoleranceSchema } from '@resources/allergy-intolerance/schemas/allergyIntolerance.schema'
import { useCreateAllergyIntolerance } from '@resources/allergy-intolerance/hooks/useCreateAllergyIntolerance'
import { useUpdateAllergyIntolerance } from '@resources/allergy-intolerance/hooks/useUpdateAllergyIntolerance'
import content from '@resources/allergy-intolerance/components/AllergyIntoleranceForm.content'

export const useAllergyIntoleranceForm = ({
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
            substance: isNoKnownAllergy ? '' : (allergyData?.substance ?? ''),
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
            onsetDateTime: allergyData?.onsetDateTime
                ? new Date(allergyData.onsetDateTime)
                : undefined,
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

    return { form, onSubmit, noKnownAllergies }
}
