import { useQuery } from '@tanstack/react-query'
import { getPractitionerRoleByPractitioner } from '@resources/practitioner-role/services/practitionerRole.service'
import { fhirToPractitionerRoleDetail } from '@resources/practitioner-role/domain/practitionerRole.adapter'

export const usePractitionerRoleDetail = (practitionerId: string) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['practitionerRole', practitionerId],
        queryFn: () => getPractitionerRoleByPractitioner(practitionerId),
        select: (data) =>
            data ? fhirToPractitionerRoleDetail(data) : undefined,
    })

    return {
        practitionerRole: data,
        isPending: isPending,
        isError: isError,
        error: error,
    }
}
