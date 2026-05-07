export const GENDER_OPTIONS = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Unknown', value: 'unknown' },
] as const

export type GenderValue = (typeof GENDER_OPTIONS)[number]['value']

export const GENDER_VALUES = GENDER_OPTIONS.map(o => o.value) as [GenderValue, ...GenderValue[]]

export const MARITAL_STATUS_OPTIONS = [
    { label: 'Annulled', value: 'A' },
    { label: 'Divorced', value: 'D' },
    { label: 'Interlocutory', value: 'I' },
    { label: 'Legally Separated', value: 'L' },
    { label: 'Married', value: 'M' },
    { label: 'Polygamous', value: 'P' },
    { label: 'Never Married', value: 'S' },
    { label: 'Domestic Partner', value: 'T' },
    { label: 'Unmarried', value: 'U' },
    { label: 'Widowed', value: 'W' },
    { label: 'Unknown', value: 'UNK' },
] as const

export type MaritalStatusValue = (typeof MARITAL_STATUS_OPTIONS)[number]['value']

export const MARITAL_STATUS_VALUES = MARITAL_STATUS_OPTIONS.map(o => o.value) as [MaritalStatusValue, ...MaritalStatusValue[]]

export const DAYS_OF_WEEK_OPTIONS = [
    { label: 'Monday', value: 'mon' },
    { label: 'Tuesday', value: 'tue' },
    { label: 'Wednesday', value: 'wed' },
    { label: 'Thursday', value: 'thu' },
    { label: 'Friday', value: 'fri' },
    { label: 'Saturday', value: 'sat' },
    { label: 'Sunday', value: 'sun' },
] as const

export type DayOfWeekValue = (typeof DAYS_OF_WEEK_OPTIONS)[number]['value']

export const DAYS_OF_WEEK_VALUES = DAYS_OF_WEEK_OPTIONS.map(o => o.value) as [DayOfWeekValue, ...DayOfWeekValue[]]
