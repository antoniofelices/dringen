import { useMemo } from 'react'
import { usePatientContext } from '@/hooks/usePatientContext'

type WeightData = {
    date: string
    weight: number
}

type BMIData = {
    date: string
    bmi: number
}
export const useDataWeight = (): WeightData[] => {
    const { clinicalHistory } = usePatientContext()

    const weightData = useMemo(() => {
        return (
            clinicalHistory
                ?.filter(
                    (item) =>
                        item.person_weight != null &&
                        item.type_of === 'nutricional'
                )
                .map((item) => ({
                    date: item.created_at || '',
                    weight: item.person_weight || 0,
                }))
                .sort((a, b) => {
                    const dateA = new Date(a.date)
                    const dateB = new Date(b.date)

                    return dateA.getTime() - dateB.getTime()
                }) ?? []
        )
    }, [clinicalHistory])

    return weightData
}

export const useDataBMI = (): BMIData[] => {
    const { clinicalHistory } = usePatientContext()

    const bmiData = useMemo(() => {
        return (
            clinicalHistory
                ?.filter(
                    (item) => item.imc != null && item.type_of === 'nutricional'
                )
                .map((item) => ({
                    date: item.created_at || '',
                    bmi: item.imc || 0,
                }))
                .sort((a, b) => {
                    const dateA = new Date(a.date)
                    const dateB = new Date(b.date)

                    return dateA.getTime() - dateB.getTime()
                }) ?? []
        )
    }, [clinicalHistory])

    return bmiData
}
