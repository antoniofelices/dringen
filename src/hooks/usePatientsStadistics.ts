import { useMemo } from 'react'
import { usePatients } from '@/hooks/usePatients'
import { useClinicalHistory } from '@/hooks/useClinicalHistory'

export const useDataTotalPatients = () => {
    const { patients } = usePatients()
    const totalPatients = patients?.length

    return totalPatients
}

export const useDataResidence = () => {
    const { patients } = usePatients()

    const residenceData = useMemo(() => {
        return (
            patients
                ?.filter((item) => item.place_of_residence != null)
                .map((item) => ({
                    residence: item.place_of_residence,
                })) ?? []
        )
    }, [patients])

    const uniqueResidences = [
        ...new Set(residenceData.map((item) => item.residence).filter(Boolean)),
    ]

    const result = uniqueResidences.map((residence) => ({
        residence,
        quantity: residenceData.filter((item) => item.residence === residence)
            .length,
    }))

    return result
}

export const useDataTypeOf = () => {
    const { clinicalHistory } = useClinicalHistory()

    const typeOfData = useMemo(() => {
        return (
            clinicalHistory
                ?.filter((item) => item.type_of != null)
                .map((item) => ({
                    type: item.type_of,
                })) ?? []
        )
    }, [clinicalHistory])

    const uniqueTypeOf = [
        ...new Set(typeOfData.map((item) => item.type).filter(Boolean)),
    ]

    const result = uniqueTypeOf.map((type) => ({
        type,
        quantity: typeOfData.filter((item) => item.type === type).length,
    }))

    return result
}
