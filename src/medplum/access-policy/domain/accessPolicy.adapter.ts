import type { AccessPolicy } from '@medplum/fhirtypes'
import type { AccessPolicyType } from '@resourcesmedplum/access-policy/types/accessPolicy.model'

export function fhirToAccessPolicy(
    accessPolicy: AccessPolicy
): AccessPolicyType {
    return {
        id: accessPolicy.id ?? '',
        name: accessPolicy.name ?? '',
    }
}
