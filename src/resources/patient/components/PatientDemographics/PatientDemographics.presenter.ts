import { getLabelFromOptions } from '@shared/utils/utils'
import { GENDER_OPTIONS } from '@shared/fhir/valueSets.domain'
import type { PatientType } from '@resources/patient/types/patient.model'
import content from './PatientDemographics.content'

const { maritalStatusOptions } = content

export const buildDataItems = (patientData: PatientType) => [
    {
        label: content.labelGender,
        value: getLabelFromOptions(GENDER_OPTIONS, patientData.gender),
    },
    {
        label: content.labelMaritalStatus,
        value: getLabelFromOptions(
            maritalStatusOptions,
            patientData.maritalStatus
        ),
    },
]
