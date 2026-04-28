import type { PractitionerRoleCode } from '@resourcesmedplum/access-policy/types/accessPolicy.model'

export const PRACTITIONER_ROLE_TO_SNOMED: Record<
    PractitionerRoleCode,
    string[]
> = {
    doctor: ['309343006', 'Physician (occupation)'],
    administrative: ['224608005', 'Administrative worker'],
    'administrative-hr': ['224608005', 'Administrative worker'],
}
