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
    specialty: string
    availableTime: AvailableTimeType[]
    locationIds: string[]
}
