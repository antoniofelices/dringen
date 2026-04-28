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

const specialtyOptions = [
    'pediatric',
    'obstetrics-and-gynecology',
    'internal-medicine',
    'surgery-general',
    'dermatology',
] as const

export { daysOfWeekOptions, genderOptions, roleOptions, specialtyOptions }
