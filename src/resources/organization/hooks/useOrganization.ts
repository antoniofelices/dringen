import { useQuery } from '@tanstack/react-query'
import { getOrganization } from '@resources/organization/services/organization.service'
import { fhirToOrganization } from '@resources/organization/domain/organization.adapter'

export const useOrganization = () => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['clinicOrganization'],
        staleTime: Infinity,
        queryFn: () => getOrganization(),
        select: fhirToOrganization,
    })

    return {
        organization: data,
        isPending,
        isError,
        error,
    }
}
