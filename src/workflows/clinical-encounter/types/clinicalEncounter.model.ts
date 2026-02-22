import type { z } from 'zod'
import type { Control } from 'react-hook-form'
import type { clinicalEncounterSchema } from '@workflows/clinical-encounter/schemas/clinicalEncounter.schema'

export type ClinicalEncounterFormType = z.infer<typeof clinicalEncounterSchema>

export type AggregateParams = {
    formData: ClinicalEncounterFormType
    patientId: string
    practitionerId: string
}

export type DiagnosisEntry = {
    cie10: string
    diagnosis: string
    certainty: 'suspected' | 'probable' | 'confirmed'
}

export type TabProps = {
    control: Control<ClinicalEncounterFormType>
}
