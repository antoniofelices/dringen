import type { AvailableTimeType } from '@shared/fhir/availableTime.model'
import type { PractitionerDetailsData } from '@resources/practitioner/types/practitioner.model'
import content from './PractitionerDetails.content'

export const formatAvailableTime = (availableTime: AvailableTimeType[]) =>
    availableTime
        .map(
            (time) => `${time.daysOfWeek}: ${time.startTime} - ${time.endTime}`
        )
        .join(' | ')

export const buildDataItems = (data: PractitionerDetailsData) => [
    { label: content.labelSpecialty, value: data.specialty },
    { label: content.labelHospital, value: data.hospital },
    { label: content.labelOutpatientFacility, value: data.outpatientFacility },
    {
        label: content.labelAvailableTime,
        value: formatAvailableTime(data.availableTime),
    },
]
