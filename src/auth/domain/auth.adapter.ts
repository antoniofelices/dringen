import type { UserRoleType, AuthMeAccessPolicy } from '@auth/types/auth.model'

export function policyNameToUserRole(
    policyName: string | undefined
): UserRoleType | null {
    switch (policyName) {
        case 'Doctor Policy':
            return 'doctor'
        case 'Administrative Policy':
            return 'administrative'
        case 'Administrative HR Policy':
            return 'administrative_hr'
        default:
            return null
    }
}

export function accessPolicyToUserRole(
    accessPolicy: AuthMeAccessPolicy | undefined
): UserRoleType | null {
    return policyNameToUserRole(accessPolicy?.basedOn?.[0]?.display)
}
