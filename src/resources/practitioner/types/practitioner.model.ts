import type { Practitioner } from '@medplum/fhirtypes'

export type PractitionerWithSpecialty = {
    practitioner: Practitioner
    specialty: string
}

export type PractitionerType = {
    id: string
    firstName: string
    lastName: string
    email: string
}

export type PhysicianType = {
    id: string
    firstName: string
    lastName: string
    specialty: string
}
