import type { z } from 'zod'
import type { allergyIntoleranceSchema } from '@resources/allergy-intolerance/schemas/allergyIntolerance.schema'

export type AllergyIntoleranceType = {
    id: string
    substance: string
    type: string
    category: string
    criticality: string
    clinicalStatus: string
    verificationStatus: string
    onsetDateTime: string
    manifestation: string
    severity: string
    note: string
}

export type AllergyIntoleranceFormProps = {
    patientId: string
    allergyData?: AllergyIntoleranceType
    mode: 'create' | 'edit'
    onSuccess: () => void
}

export type AllergyIntoleranceFormType = z.infer<
    typeof allergyIntoleranceSchema
>
