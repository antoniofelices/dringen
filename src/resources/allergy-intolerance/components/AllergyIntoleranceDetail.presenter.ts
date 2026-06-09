import type { AllergyIntoleranceType } from '@resources/allergy-intolerance/types/allergyIntolerance.model'
import { contentES as content } from './AllergyIntoleranceDetail.content'

export const buildDataItems = (allergyIntolerance: AllergyIntoleranceType) => [
    { label: content.labelSubstance, value: allergyIntolerance.substance },
    { label: content.labelType, value: allergyIntolerance.type },
    { label: content.labelCategory, value: allergyIntolerance.category },
    { label: content.labelCriticality, value: allergyIntolerance.criticality },
    { label: content.labelClinicalStatus, value: allergyIntolerance.clinicalStatus },
    { label: content.labelVerificationStatus, value: allergyIntolerance.verificationStatus },
    { label: content.labelOnsetDateTime, value: allergyIntolerance.onsetDateTime },
    { label: content.labelManifestation, value: allergyIntolerance.manifestation },
    { label: content.labelSeverity, value: allergyIntolerance.severity },
    { label: content.labelNote, value: allergyIntolerance.note },
]
