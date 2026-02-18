import { z } from 'zod'
import content from './patientDemographics.content'

export const patientDemographicsSchema = z.object({
    firstName: z
        .string()
        .min(2, content.errorFirstNameTooShort)
        .max(20, content.errorFirstNameTooLong)
        .trim(),

    lastName: z
        .string()
        .min(2, content.errorLastNameTooShort)
        .max(20, content.errorLastNameTooLong)
        .trim(),

    gender: z.enum(['male', 'female', 'other', 'unknown'], {
        error: content.errorGenderRequired,
    }),

    maritalStatus: z
        .enum(['A', 'D', 'I', 'L', 'M', 'P', 'S', 'T', 'U', 'W', 'UNK'], {
            error: content.errorMaritalStatusRequired,
        })
        .optional(),
})
