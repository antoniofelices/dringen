import content from './PractitionerDetails.content'
import type { PractitionerDetailsData } from '@resources/practitioner/types/practitioner.model'

export const buildDataItems = (data: PractitionerDetailsData) => [
    { label: content.labelSpecialty, value: data.specialty },
    { label: content.labelHospital, value: data.hospital },
    { label: content.labelOutpatientFacility, value: data.outpatientFacility },
    { label: content.labelAvailableTime, value: data.availableTime },
]
