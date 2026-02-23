import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
    getAllergyIntoleranceById,
    updateAllergyIntolerance,
} from '@resources/allergy-intolerance/services/allergyIntolerance.service'
import { allergyIntoleranceFormToFhir } from '@resources/allergy-intolerance/domain/allergyIntolerance.adapter'
import type { AllergyIntoleranceFormType } from '@resources/allergy-intolerance/types/allergyIntolerance.model'

export const useUpdateAllergyIntolerance = (
    id: string,
    patientId: string
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (formData: AllergyIntoleranceFormType) => {
            const existing = await getAllergyIntoleranceById(id)
            const updated = allergyIntoleranceFormToFhir(formData, existing)
            return updateAllergyIntolerance(id, updated)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['allergyIntolerances', patientId],
            })
            queryClient.invalidateQueries({
                queryKey: ['allergyIntolerance', id],
            })
        },
    })
}
