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
import { getValueFromOptions } from '@shared/utils/utils'
import { getRelationshipOptions } from '@shared/fhir/valueSets.domain'
import { contentES as content } from '@resources/family-member-history/components/FamilyMemberHistoryForm.content'

export const useFamilyMemberHistoryForm = ({
    patientId,
    historyData,
    mode,
    onSuccess,
}: FamilyMemberHistoryFormProps) => {
    const createMutation = useCreateFamilyMemberHistory(patientId, content)
    const updateMutation = useUpdateFamilyMemberHistory(
        historyData?.id ?? '',
        patientId,
        content
    )

    const isNoKnownHistory =
        historyData?.condition === 'No family history of disorder'

    const form = useForm<FamilyMemberHistoryFormType>({
        resolver: zodResolver(familyMemberHistorySchema),
        defaultValues: {
            noKnownFamilyHistory: isNoKnownHistory,
            relationship: isNoKnownHistory
                ? ''
                : (getValueFromOptions(
                      getRelationshipOptions(content),
                      historyData?.relationship
                  ) ?? ''),
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

    return { form, onSubmit, noKnownFamilyHistory }
}
