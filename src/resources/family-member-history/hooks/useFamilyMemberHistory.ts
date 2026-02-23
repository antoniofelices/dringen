import { useQuery } from '@tanstack/react-query'
import {
    getFamilyMemberHistoriesByPatient,
    getFamilyMemberHistoryById,
} from '@resources/family-member-history/services/familyMemberHistory.service'
import { fhirToFamilyMemberHistory } from '@resources/family-member-history/domain/familyMemberHistory.adapter'

export const useFamilyMemberHistoryList = (patientId: string) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['familyMemberHistories', patientId],
        queryFn: () => getFamilyMemberHistoriesByPatient(patientId),
        select: (data) => data.map(fhirToFamilyMemberHistory),
        enabled: !!patientId,
    })

    return {
        familyMemberHistories: data,
        isPending,
        isError,
        error,
    }
}

export const useFamilyMemberHistory = (id: string) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['familyMemberHistory', id],
        queryFn: () => getFamilyMemberHistoryById(id),
        select: fhirToFamilyMemberHistory,
        enabled: !!id,
    })

    return {
        familyMemberHistory: data,
        isPending,
        isError,
        error,
    }
}
