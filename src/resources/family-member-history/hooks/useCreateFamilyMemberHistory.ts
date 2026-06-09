import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFamilyMemberHistory } from '@resources/family-member-history/services/familyMemberHistory.service'
import { familyMemberHistoryToFhir } from '@resources/family-member-history/domain/familyMemberHistory.adapter'
import type { FamilyMemberHistoryFormType } from '@resources/family-member-history/types/familyMemberHistory.model'
import type { ValueSetsContent } from '@shared/fhir/valueSets.content'

export const useCreateFamilyMemberHistory = (patientId: string, content: ValueSetsContent) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (formData: FamilyMemberHistoryFormType) => {
            const resource = familyMemberHistoryToFhir(formData, patientId, content)
            return createFamilyMemberHistory(resource)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['familyMemberHistories', patientId],
            })
        },
    })
}
