import type { AvailableTimeType } from '@shared/fhir/availableTime.model'

export type PractitionerRoleInfo = {
    practitionerId: string
    specialty: string
}

export type PractitionerRoleDetailType = {
    role: string
    specialty: string
    availableTime: AvailableTimeType[]
    locationIds: string[]
}

export type PractitionerDetailsFormData = {
    specialty: string
    outpatientFacility?: string
    availableTime: AvailableTimeType[]
}
