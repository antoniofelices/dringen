import type { z } from 'zod'
import type { Practitioner } from '@medplum/fhirtypes'
import type { OptionType } from '@shared/types/FormFieldCombobox.model'
import type { AvailableTimeType } from '@shared/fhir/availableTime.model'
import type { practitionerDetailsSchema } from '@resources/practitioner/schemas/practitionerDetails.schema'

export type PractitionerWithSpecialty = {
    practitioner: Practitioner
    specialty: string
}

export type PractitionerType = {
    id: string
    firstName: string
    lastName: string
    phone: string
    email: string
}

export type PhysicianType = {
    id: string
    firstName: string
    lastName: string
    specialty: string
}

export type PractitionerDetailsData = {
    phone: string
    email: string
    specialty: string
    hospital: string
    hospitalId?: string
    outpatientFacility: string
    outpatientFacilityId?: string
    availableTime: AvailableTimeType[]
    hasData?: boolean
}

export type PractitionerDetailsFormType = z.infer<
    typeof practitionerDetailsSchema
>

export type UsePractitionerDetailsFormProps = {
    practitionerId: string
    hospitalId: string
    defaultValues: PractitionerDetailsFormType
    outpatientOptions: OptionType[]
    onSuccess: () => void
}
