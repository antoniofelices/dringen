import { z } from 'zod'
import content from './allergyIntolerance.content'

export const allergyIntoleranceSchema = z
    .object({
        noKnownAllergies: z.boolean(),
        substance: z.string(),
        type: z.enum(['allergy', 'intolerance']).optional(),
        category: z
            .enum(['food', 'medication', 'environment', 'biologic'])
            .optional(),
        criticality: z
            .enum(['low', 'high', 'unable-to-assess'])
            .optional(),
        clinicalStatus: z.enum(['active', 'inactive', 'resolved'], {
            error: content.errorClinicalStatusRequired,
        }),
        verificationStatus: z
            .enum(['unconfirmed', 'confirmed', 'refuted', 'entered-in-error'])
            .optional(),
        onsetDateTime: z.string().optional(),
        manifestation: z.string().optional(),
        severity: z.enum(['mild', 'moderate', 'severe']).optional(),
        note: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (!data.noKnownAllergies && (!data.substance || data.substance.trim() === '')) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: content.errorSubstanceRequired,
                path: ['substance'],
            })
        }
    })
