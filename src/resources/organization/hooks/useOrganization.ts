import { useQuery } from '@tanstack/react-query'
import {
    getOrganization,
    getListOrganizations,
} from '@/resources/organization/services/organization.service'
import { fhirToOrganization } from '@resources/organization/domain/organization.adapter'

export const useOrganization = (id: string) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['organization', id],
        queryFn: () => getOrganization(id),
        select: fhirToOrganization,
    })

    return {
        organization: data,
        isPending: isPending,
        isError: isError,
        error: error,
    }
}

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
