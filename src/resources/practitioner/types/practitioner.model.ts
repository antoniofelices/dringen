import type { z } from 'zod'
import type { Practitioner } from '@medplum/fhirtypes'
import type { OptionType } from '@shared/types/FormFieldCombobox.model'
import type { AvailableTimeType } from '@shared/fhir/availableTime.model'
import { practitionerDetailsSchema } from '@resources/practitioner/schemas/practitionerDetails.schema'
import { addNewPractitionerFormSchema } from '@resources/practitioner/schemas/addNewPractitionerForm.schema'

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
export type AddNewPractitionerFormType = z.infer<
    typeof addNewPractitionerFormSchema
>

export type UsePractitionerDetailsFormProps = {
    practitionerId: string
    hospitalId: string
    defaultValues: PractitionerDetailsFormType
    outpatientOptions: OptionType[]
    onSuccess: () => void
}

export type AddNewPractitionerFormProps = {
    onSuccess?: () => void
}
