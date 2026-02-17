import type { Practitioner } from '@medplum/fhirtypes'
import { useAuth } from '@auth/hooks/useAuth'
import { fhirToPractitioner } from '@resources/practitioner/domain/practitioner.adapter'

export const useCurrentUser = () => {
    const { profile, loading } = useAuth()

    const practitioner =
        profile?.resourceType === 'Practitioner'
            ? fhirToPractitioner(profile as Practitioner)
            : undefined

    return {
        user: practitioner,
        isPending: loading,
        isAuthenticated: !!profile,
    }
}
