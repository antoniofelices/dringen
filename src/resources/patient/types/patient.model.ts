import type { z } from 'zod'
import type { addNewPatientSchema } from '@resources/patient/schemas/addNewPatient.schema'

export type MaritalStatusCode =
    | 'A'
    | 'D'
    | 'I'
    | 'L'
    | 'M'
    | 'P'
    | 'S'
    | 'T'
    | 'U'
    | 'W'
    | 'UNK'

export type PatientType = {
    id: string
    firstName: string
    lastName: string
    birthDate: string
    email: string
    address: string
    dni: string
    gender: 'male' | 'female' | 'other' | 'unknown'
    maritalStatus: MaritalStatusCode | undefined
}

export type PatientDemographicsFormType = {
    firstName: string
    lastName: string
    gender: string
    maritalStatus: string
}

export type AddNewPatientType = z.infer<typeof addNewPatientSchema>
