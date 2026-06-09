import { getLabelFromOptions } from '@shared/utils/utils'
import { getGenderOptions, getMaritalStatusOptions } from '@shared/fhir/valueSets.domain'
import type { PatientType } from '@resources/patient/types/patient.model'
import { contentES as content } from './PatientDemographics.content'

export const buildDataItems = (patientData: PatientType) => [
    {
        label: content.labelGender,
        value: getLabelFromOptions(getGenderOptions(content), patientData.gender),
    },
    {
        label: content.labelMaritalStatus,
        value: getLabelFromOptions(
            getMaritalStatusOptions(content),
            patientData.maritalStatus
        ),
    },
]
