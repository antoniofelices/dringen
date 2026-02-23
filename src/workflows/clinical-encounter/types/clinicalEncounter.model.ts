import type { z } from 'zod'
import type { Control } from 'react-hook-form'
import type {
    Condition,
    Encounter,
    MedicationRequest,
    Observation,
    ServiceRequest,
} from '@medplum/fhirtypes'
import type { clinicalEncounterSchema } from '@workflows/clinical-encounter/schemas/clinicalEncounter.schema'

export type ClinicalEncounterFormType = z.infer<typeof clinicalEncounterSchema>

export type AggregateParamsType = {
    formData: ClinicalEncounterFormType
    patientId: string
    practitionerId: string
}

export type TabPropsType = {
    control: Control<ClinicalEncounterFormType>
}

export type EncounterListResponseType = {
    encounters: Encounter[]
    conditions: Condition[]
}

export type EncounterWithConditionType = {
    encounter: Encounter
    condition: Condition | undefined
}

export type ClinicalEncounterReadResponseType = {
    encounter: Encounter
    observations: Observation[]
    conditions: Condition[]
    medicationRequests: MedicationRequest[]
    serviceRequests: ServiceRequest[]
}
