import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFamilyMemberHistory } from '@resources/family-member-history/services/familyMemberHistory.service'
import { familyMemberHistoryToFhir } from '@resources/family-member-history/domain/familyMemberHistory.adapter'
import type { FamilyMemberHistoryFormType } from '@resources/family-member-history/types/familyMemberHistory.model'

export const useCreateFamilyMemberHistory = (patientId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (formData: FamilyMemberHistoryFormType) => {
            const resource = familyMemberHistoryToFhir(formData, patientId)
            return createFamilyMemberHistory(resource)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['familyMemberHistories', patientId],
            })
        },
    })
}
