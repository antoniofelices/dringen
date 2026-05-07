export const GENDER_OPTIONS = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Unknown', value: 'unknown' },
] as const

export type GenderValue = (typeof GENDER_OPTIONS)[number]['value']

export const GENDER_VALUES = GENDER_OPTIONS.map(o => o.value) as [GenderValue, ...GenderValue[]]
