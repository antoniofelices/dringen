import type { PractitionerRoleCode } from '@resourcesmedplum/access-policy/types/accessPolicy.model'

export const ROLE_PRACTITIONER_TO_SNOMED: Record<
    PractitionerRoleCode,
    string[]
> = {
    doctor: ['309343006', 'Physician (occupation)'],
    administrative: ['224608005', 'Administrative worker'],
    'administrative-hr': ['224608005', 'Administrative worker'],
}

export const SPECIALTY_TO_SNOMED = {
    pediatric: ['394537008', 'Pediatric specialty'],
    'obstetrics-and-gynecology': ['394585009', 'Obstetrics and gynecology'],
    'internal-medicine': ['419192003', 'Internal medicine'],
    'surgery-general': ['394609007', 'Surgery-general'],
    dermatology: ['394582007', 'Dermatology'],
}
