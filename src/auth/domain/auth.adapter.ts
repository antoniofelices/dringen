import type { PractitionerRole } from '@medplum/fhirtypes'
import type { UserRoleType } from '@auth/types/auth.model'

export function fhirRoleToUserRole(
    practitionerRole: PractitionerRole
): UserRoleType | null {
    const code = practitionerRole.code?.[0]?.coding?.[0]?.code

    switch (code) {
        case '224608005':
            return 'administrative'
        case 'doctor':
            return 'doctor'
        default:
            return null
    }
}
