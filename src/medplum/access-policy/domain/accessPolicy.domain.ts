import type { PractitionerRoleCode } from '@medplum/access-policy/types/accessPolicy.model'

export const PRACTITIONER_ROLE_TO_POLICY_NAME: Record<
    PractitionerRoleCode,
    string
> = {
    doctor: 'Doctor',
    administrative: 'Administrative',
    'administrative-hr': 'Administrative HR',
}
