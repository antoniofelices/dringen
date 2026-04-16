import type { PractitionerRoleCode } from '@resourcesmedplum/access-policy/types/accessPolicy.model'

export const ROLE_PRACTITIONER_TO_POLICY_NAME: Record<
    PractitionerRoleCode,
    string
> = {
    doctor: 'Doctor Policy',
    administrative: 'Administrative Policy',
    'administrative-hr': 'Administrative HR Policy',
}
