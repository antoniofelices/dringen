import { APP_FHIR_BASE_URL } from '@shared/fhir/config'

const PHYSICIAN_NOTE_CODE_SYSTEM = `${APP_FHIR_BASE_URL}/basic-types`
const PHYSICIAN_NOTE_CODE = 'physician-note'
const PHYSICIAN_NOTE_TEXT_URL =
    `${APP_FHIR_BASE_URL}/StructureDefinition/physician-note-text`

export {
    PHYSICIAN_NOTE_CODE_SYSTEM,
    PHYSICIAN_NOTE_CODE,
    PHYSICIAN_NOTE_TEXT_URL,
}
