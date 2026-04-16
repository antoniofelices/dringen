import { useQuery } from '@tanstack/react-query'
import { getAccessPolicyList } from '@resourcesmedplum/access-policy/services/accessPolicy.service'
import { fhirToAccessPolicy } from '@resourcesmedplum/access-policy/domain/accessPolicy.adapter'

export const useAccessPolicyList = () => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['accessPolicies'],
        queryFn: () => getAccessPolicyList(),
        select: (data) => data.map(fhirToAccessPolicy),
    })

    return {
        accessPolicies: data ?? [],
        isPending,
        isError,
        error,
    }
}
