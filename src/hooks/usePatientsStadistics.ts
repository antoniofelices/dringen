import { useMemo } from 'react'
import { usePatientsAllData } from '@/hooks/usePatientsAllData'

export const useDataTotalPatients = () => {
    const { patients } = usePatientsAllData()
    const totalPatients = patients?.length

    return totalPatients
}

export const useDataResidence = () => {
    const { patients } = usePatientsAllData()

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
