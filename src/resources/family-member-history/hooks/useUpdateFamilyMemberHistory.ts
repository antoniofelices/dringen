import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
    getFamilyMemberHistoryById,
    updateFamilyMemberHistory,
} from '@resources/family-member-history/services/familyMemberHistory.service'
import { familyMemberHistoryFormToFhir } from '@resources/family-member-history/domain/familyMemberHistory.adapter'
import type { FamilyMemberHistoryFormType } from '@resources/family-member-history/types/familyMemberHistory.model'

export const useUpdateFamilyMemberHistory = (
    id: string,
    patientId: string
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (formData: FamilyMemberHistoryFormType) => {
            const existing = await getFamilyMemberHistoryById(id)
            const updated = familyMemberHistoryFormToFhir(formData, existing)
            return updateFamilyMemberHistory(id, updated)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['familyMemberHistories', patientId],
            })
            queryClient.invalidateQueries({
                queryKey: ['familyMemberHistory', id],
            })
        },
    })
}
