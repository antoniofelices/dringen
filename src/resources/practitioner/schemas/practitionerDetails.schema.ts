import { z } from 'zod'
import content from './practitionerDetails.content'

export const practitionerDetailsSchema = z.object({
    specialty: z
        .string()
        .min(2, content.errorSpecialtyTooShort)
        .max(50, content.errorSpecialtyTooLong)
        .trim(),

    outpatientFacility: z.string().optional(),
})
