import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
    getPractitionerRoleByPractitioner,
    updatePractitionerRole,
} from '@resources/practitioner-role/services/practitionerRole.service'
import { practitionerDetailsToFhir } from '@resources/practitioner-role/domain/practitionerRole.adapter'
import type { PractitionerDetailsFormType } from '@resources/practitioner/types/practitioner.model'

export const useUpdatePractitionerDetails = (
    practitionerId: string,
    hospitalId: string
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (formData: PractitionerDetailsFormType) => {
            const existingRole =
                await getPractitionerRoleByPractitioner(practitionerId)
            if (!existingRole?.id) throw new Error('PractitionerRole not found')

            const updatedRole = practitionerDetailsToFhir(
                formData,
                existingRole,
                hospitalId
            )
            return updatePractitionerRole(existingRole.id, updatedRole)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['practitionerRole', practitionerId],
            })
        },
    })
}
