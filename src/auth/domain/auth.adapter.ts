import type { UserRoleType, AuthMeAccessPolicy } from '@auth/types/auth.model'

export function accessPolicyToUserRole(
    accessPolicy: AuthMeAccessPolicy | undefined
): UserRoleType | null {
    const policyName = accessPolicy?.basedOn?.[0]?.display

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
