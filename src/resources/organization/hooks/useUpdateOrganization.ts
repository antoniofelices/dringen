import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
    getOrganizationById,
    updateOrganization,
} from '@resources/organization/services/organization.service'
import { organizationDetailsToFhir } from '@resources/organization/domain/organization.adapter'
import type { OrganizationDetailsFormType } from '@resources/organization/types/organization.model'

export const useUpdateOrganization = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (formData: OrganizationDetailsFormType) => {
            const existing = await getOrganizationById(organizationId)
            const updated = organizationDetailsToFhir(formData, existing)
            return updateOrganization(organizationId, updated)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['organization', organizationId],
            })
        },
    })
}
