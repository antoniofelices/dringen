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

export const useDataTypeOfByDay = () => {
    const { clinicalHistory } = useClinicalHistory()

    const typeOfData = useMemo(() => {
        return (
            clinicalHistory
                ?.filter((item) => item.type_of != null)
                .map((item) => ({
                    type: item.type_of || null,
                    date: item.created_at || 0,
                }))
                .sort((a, b) => {
                    const dateA = new Date(a.date)
                    const dateB = new Date(b.date)

                    return dateA.getTime() - dateB.getTime()
                })
                .map((item) => ({
                    type: item.type,
                    date: new Date(item.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    }),
                })) ?? []
        )
    }, [clinicalHistory])

    const uniqueTypeOf = {
        ...typeOfData,
        ...new Set(typeOfData.map((item) => item.date).filter(Boolean)),
    }

    // const result = uniqueTypeOf.map((item) => ({
    //     type: item?.type_of,
    //     date: item.date,
    //     quantity: typeOfData.filter((q) => q.type === item.type_of).length,
    // }))

    return uniqueTypeOf
}
