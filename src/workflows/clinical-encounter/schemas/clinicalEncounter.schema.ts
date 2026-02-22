import { z } from 'zod'

const diagnosisSchema = z.object({
    cie10: z.string().trim(),
    diagnosis: z.string().trim(),
    certainty: z.enum(['suspected', 'probable', 'confirmed']),
})

export const clinicalEncounterSchema = z.object({
    // Observation tab
    description: z.string().trim().optional(),
    examination: z.string().trim().optional(),
    person_weight: z.string().trim().optional(),
    person_height: z.string().trim().optional(),

    // Vitals
    temperature: z.string().trim().optional(),
    pas: z.string().trim().optional(),
    pad: z.string().trim().optional(),
    fc: z.string().trim().optional(),
    fr: z.string().trim().optional(),
    oximetry: z.string().trim().optional(),

    // Biological basics
    eating: z.string().trim().optional(),
    thirst: z.string().trim().optional(),
    urine: z.string().trim().optional(),
    feces: z.string().trim().optional(),
    sleep: z.string().trim().optional(),
    mood: z.string().trim().optional(),

    // Condition tab
    diagnoses: z.array(diagnosisSchema).optional(),

    // Service Request tab
    additional_tests: z.string().trim().optional(),

    // Medication Request tab
    treatment: z.string().trim().optional(),
})
