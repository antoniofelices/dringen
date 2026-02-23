import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAllergyIntolerance } from '@resources/allergy-intolerance/services/allergyIntolerance.service'
import { allergyIntoleranceToFhir } from '@resources/allergy-intolerance/domain/allergyIntolerance.adapter'
import type { AllergyIntoleranceFormType } from '@resources/allergy-intolerance/types/allergyIntolerance.model'

export const useCreateAllergyIntolerance = (patientId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (formData: AllergyIntoleranceFormType) => {
            const resource = allergyIntoleranceToFhir(formData, patientId)
            return createAllergyIntolerance(resource)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['allergyIntolerances', patientId],
            })
        },
    })
}
