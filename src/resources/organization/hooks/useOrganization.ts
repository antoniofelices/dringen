import { useQuery } from '@tanstack/react-query'
import { getListOrganizations } from '@/resources/organization/services/organization.service'
import { fhirToOrganization } from '@resources/organization/domain/organization.adapter'

export const useOrganizations = () => {
    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ['listOrganizations'],
        queryFn: () => getListOrganizations(),
        select: (data) => data.map(fhirToOrganization),
    })

    return {
        organizations: data,
        isPending: isPending,
        isError: isError,
        error: error,
        refetch: refetch,
    }
}
