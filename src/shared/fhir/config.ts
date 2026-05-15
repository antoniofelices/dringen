const HEADERSCONFIG = {
    Accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.APP_API_TOKEN || ''}`,
}

const MEDPLUM_CONFIG = {
    baseUrl: import.meta.env.APP_MEDPLUM_BASE_URL || 'https://api.medplum.com',
    clientId: import.meta.env.APP_MEDPLUM_CLIENT_ID || '',
    clientSecret: import.meta.env.APP_MEDPLUM_CLIENT_SECRET,
    projectId: import.meta.env.APP_MEDPLUM_PROJECT_ID,
    organizationId: import.meta.env.APP_MEDPLUM_ORGANIZATION_ID,
}

const APP_FHIR_BASE_URL = 'https://codiceclinico.app/fhir'

const LOINC_SYSTEM = 'http://loinc.org'
const SNOMED_SYSTEM = 'http://snomed.info/sct'
const ICD10_SYSTEM = 'http://hl7.org/fhir/sid/icd-10'
const HL7_TERMINOLOGY_BASE_URL = 'http://terminology.hl7.org/CodeSystem'

export {
    HEADERSCONFIG,
    MEDPLUM_CONFIG,
    APP_FHIR_BASE_URL,
    LOINC_SYSTEM,
    SNOMED_SYSTEM,
    ICD10_SYSTEM,
    HL7_TERMINOLOGY_BASE_URL,
}
