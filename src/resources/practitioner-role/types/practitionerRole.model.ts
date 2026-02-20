export type PractitionerRoleInfo = {
    practitionerId: string
    specialty: string
}

export type AvailableTimeType = {
    daysOfWeek: string
    startTime: string
    endTime: string
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
}
