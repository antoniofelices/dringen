import type { z } from 'zod'
import type { Practitioner } from '@medplum/fhirtypes'
import type { practitionerDetailsSchema } from '@resources/practitioner/schemas/practitionerDetails.schema'

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

export type PractitionerDetailsData = {
    specialty: string
    hospital: string
    hospitalId?: string
    outpatientFacility: string
    outpatientFacilityId?: string
    availableTime?: string
    hasData?: boolean
}

export type PractitionerDetailsFormType = z.infer<
    typeof practitionerDetailsSchema
>
