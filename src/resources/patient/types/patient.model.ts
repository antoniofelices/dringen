import type { z } from 'zod'
import type { GenderValue, MaritalStatusValue } from '@shared/fhir/valueSets.domain'
import type { addNewPatientSchema } from '@resources/patient/schemas/addNewPatient.schema'
import type { patientDemographicsSchema } from '@resources/patient/schemas/patientDemographics.schema'

export type PatientType = {
    id: string
    firstName: string
    lastName: string
    birthDate: string
    phone: string
    email: string
    address: string
    dni: string
    gender: GenderValue
    maritalStatus: MaritalStatusValue | undefined
}

export type PatientDemographicsFormType = z.infer<
    typeof patientDemographicsSchema
>

export type AddNewPatientType = z.infer<typeof addNewPatientSchema>
