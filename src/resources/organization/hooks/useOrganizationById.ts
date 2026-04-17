import { useQuery } from '@tanstack/react-query'
import { getOrganizationById } from '@resources/organization/services/organization.service'
import { fhirToOrganization } from '@resources/organization/domain/organization.adapter'

export const useOrganizationById = (id: string) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['organization', id],
        queryFn: () => getOrganizationById(id),
        select: fhirToOrganization,
    })

    return {
        organization: data,
        isPending: isPending,
        isError: isError,
        error: error,
    }
}
