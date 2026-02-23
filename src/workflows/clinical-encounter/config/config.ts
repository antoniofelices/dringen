const LOINC_SYSTEM = 'http://loinc.org'
const SNOMED_SYSTEM = 'http://snomed.info/sct'
const ICD10_SYSTEM = 'http://hl7.org/fhir/sid/icd-10'
const CERTAINTY_MAP = {
    suspected: { code: '415684004', display: 'Suspected' },
    probable: { code: '2931005', display: 'Probable diagnosis' },
    confirmed: { code: '410605003', display: 'Confirmed present' },
} as const

const OBSERVATION_FIELDS = {
    person_weight: {
        code: '29463-7',
        display: 'Body weight',
        unit: 'kg',
        unitCode: 'kg',
    },
    person_height: {
        code: '8302-2',
        display: 'Body height',
        unit: 'cm',
        unitCode: 'cm',
    },
    temperature: {
        code: '8310-5',
        display: 'Body temperature',
        unit: 'Cel',
        unitCode: 'Cel',
    },
    pas: {
        code: '8480-6',
        display: 'Systolic blood pressure',
        unit: 'mmHg',
        unitCode: 'mm[Hg]',
    },
    pad: {
        code: '8462-4',
        display: 'Diastolic blood pressure',
        unit: 'mmHg',
        unitCode: 'mm[Hg]',
    },
    fc: {
        code: '8867-4',
        display: 'Heart rate',
        unit: '/min',
        unitCode: '/min',
    },
    fr: {
        code: '9279-1',
        display: 'Respiratory rate',
        unit: '/min',
        unitCode: '/min',
    },
    oximetry: {
        code: '2708-6',
        display: 'Oxygen saturation',
        unit: '%',
        unitCode: '%',
    },
} as const

const BIOLOGICAL_FIELDS = {
    eating: { code: '228366006', display: 'Eating', system: SNOMED_SYSTEM },
    thirst: { code: '249475006', display: 'Thirst', system: SNOMED_SYSTEM },
    urine: { code: '251853006', display: 'Urination', system: SNOMED_SYSTEM },
    feces: { code: '111989001', display: 'Defecation', system: SNOMED_SYSTEM },
    sleep: { code: '258158006', display: 'Sleep', system: SNOMED_SYSTEM },
    mood: { code: '373931001', display: 'Mood', system: SNOMED_SYSTEM },
} as const

export {
    LOINC_SYSTEM,
    SNOMED_SYSTEM,
    ICD10_SYSTEM,
    CERTAINTY_MAP,
    OBSERVATION_FIELDS,
    BIOLOGICAL_FIELDS,
}
