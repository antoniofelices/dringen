const SLOT_INTERVAL = 15
const DAYS_VISIBLE = 5
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]
const DAYS_AHEAD = 90

const JS_DAY_TO_FHIR: Record<number, string> = {
    0: 'sun',
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
}

export { SLOT_INTERVAL, DAYS_VISIBLE, DAYS, MONTHS, DAYS_AHEAD, JS_DAY_TO_FHIR }
