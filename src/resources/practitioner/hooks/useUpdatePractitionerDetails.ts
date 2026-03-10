import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
    getPractitionerRoleByPractitioner,
    updatePractitionerRole,
} from '@resources/practitioner-role/services/practitionerRole.service'
import { practitionerDetailsToFhir } from '@resources/practitioner-role/domain/practitionerRole.adapter'
import {
    getSinglePractitionerById,
    updatePractitioner,
} from '@resources/practitioner/services/practitioner.service'
import { practitionerContactToFhir } from '@resources/practitioner/domain/practitioner.adapter'
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
            await updatePractitionerRole(existingRole.id, updatedRole)

            const existingPractitioner =
                await getSinglePractitionerById(practitionerId)
            const updatedPractitioner = practitionerContactToFhir(
                formData,
                existingPractitioner
            )
            await updatePractitioner(practitionerId, updatedPractitioner)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['practitionerRole', practitionerId],
            })
            queryClient.invalidateQueries({
                queryKey: ['practitioner', practitionerId],
            })
        },
    })
}
