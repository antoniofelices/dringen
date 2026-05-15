import { APP_FHIR_BASE_URL } from '@shared/fhir/config'

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

// FHIR extension URLs are identifiers, not endpoints. Therefore this hardcoding is a correct practice.
// The correct FHIR practice: pick one stable URI and keep it forever. It doesn't even need to point to a real page, though if it did resolve it should serve the StructureDefinition describing the extension (useful for interoperability with other FHIR systems).
const CALLED_EXTENSION_URL =
    `${APP_FHIR_BASE_URL}/StructureDefinition/appointment-called`

const STATUS_OPTIONS = [
    { value: 'booked', label: 'Booked' },
    { value: 'arrived', label: 'Arrived' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'noshow', label: 'No Show' },
]

const DEBOUNCE_MS = 300

export {
    SLOT_INTERVAL,
    DAYS_VISIBLE,
    DAYS,
    MONTHS,
    DAYS_AHEAD,
    JS_DAY_TO_FHIR,
    STATUS_OPTIONS,
    CALLED_EXTENSION_URL,
    DEBOUNCE_MS,
}
