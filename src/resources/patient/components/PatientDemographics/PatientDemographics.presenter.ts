import { getLabelFromOptions } from '@shared/utils/utils'
import type { PatientType } from '@resources/patient/types/patient.model'
import content from './PatientDemographics.content'

const { genderOptions, maritalStatusOptions } = content

export const buildDataItems = (patientData: PatientType) => [
    { label: content.labelFirstName, value: patientData.firstName },
    { label: content.labelLastName, value: patientData.lastName },
    {
        label: content.labelGender,
        value: getLabelFromOptions(genderOptions, patientData.gender),
    },
    {
        label: content.labelMaritalStatus,
        value: getLabelFromOptions(
            maritalStatusOptions,
            patientData.maritalStatus
        ),
    },
]
