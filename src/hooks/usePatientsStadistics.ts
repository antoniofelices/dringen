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

export const useDataAssistanceType = () => {
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

export const useDataAssistanceTypeDate = () => {
    const { clinicalHistory } = useClinicalHistory()

    const typeOfData = useMemo(() => {
        const rawData =
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
                    date: new Date(item.date).toISOString().slice(0, 10),
                })) ?? []

        const groupedData = rawData.reduce(
            (total, currentValue) => {
                const { date, type } = currentValue

                if (!total[date]) {
                    total[date] = { date, nutritional: 0, general: 0 }
                }

                if (type === 'nutricional') {
                    total[date].nutritional += 1
                } else if (type === 'general') {
                    total[date].general += 1
                }

                return total
            },
            {} as Record<
                string,
                { date: string; nutritional: number; general: number }
            >
        )

        return Object.values(groupedData)
    }, [clinicalHistory])

    return typeOfData
}

export const useDataGenderDate = () => {
    const { patients } = usePatients()

    console.log(patients)
    const genderData = useMemo(() => {
        const rawData =
            patients
                ?.filter((item) => item.gender != null)
                .map((item) => ({
                    gender: item.gender || null,
                    date: item.created_at || 0,
                }))
                .sort((a, b) => {
                    const dateA = new Date(a.date)
                    const dateB = new Date(b.date)
                    return dateA.getTime() - dateB.getTime()
                })
                .map((item) => ({
                    gender: item.gender,
                    date: new Date(item.date).toISOString().slice(0, 10),
                })) ?? []

        const groupedData = rawData.reduce(
            (total, currentValue) => {
                const { date, gender } = currentValue

                if (!total[date]) {
                    total[date] = { date, female: 0, male: 0, noBinary: 0 }
                }

                if (gender === 'Femenino') {
                    total[date].female += 1
                } else if (gender === 'Masculino') {
                    total[date].male += 1
                } else if (gender === 'No binario') {
                    total[date].noBinary += 1
                }

                return total
            },
            {} as Record<
                string,
                { date: string; female: number; male: number; noBinary: number }
            >
        )

        return Object.values(groupedData)
    }, [patients])

    return genderData
}
