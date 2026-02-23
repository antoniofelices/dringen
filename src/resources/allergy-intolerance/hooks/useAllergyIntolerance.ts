import { useQuery } from '@tanstack/react-query'
import {
    getAllergyIntolerancesByPatient,
    getAllergyIntoleranceById,
} from '@resources/allergy-intolerance/services/allergyIntolerance.service'
import { fhirToAllergyIntolerance } from '@resources/allergy-intolerance/domain/allergyIntolerance.adapter'

export const useAllergyIntoleranceList = (patientId: string) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['allergyIntolerances', patientId],
        queryFn: () => getAllergyIntolerancesByPatient(patientId),
        select: (data) => data.map(fhirToAllergyIntolerance),
        enabled: !!patientId,
    })

    return {
        allergyIntolerances: data,
        isPending,
        isError,
        error,
    }
}

export const useAllergyIntolerance = (id: string) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['allergyIntolerance', id],
        queryFn: () => getAllergyIntoleranceById(id),
        select: fhirToAllergyIntolerance,
        enabled: !!id,
    })

    return {
        allergyIntolerance: data,
        isPending,
        isError,
        error,
    }
}
