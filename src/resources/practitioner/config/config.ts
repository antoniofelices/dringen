const daysOfWeekOptions = [
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
    'sun',
] as const
const genderOptions = ['male', 'female', 'other', 'unknown'] as const
const roleOptions = ['doctor', 'administrative', 'administrative-hr'] as const
const snomedSystemURL = 'http://snomed.info/sct'

export { daysOfWeekOptions, genderOptions, roleOptions, snomedSystemURL }
