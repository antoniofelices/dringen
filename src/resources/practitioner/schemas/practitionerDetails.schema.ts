import { z } from 'zod'
import { contentES as content } from './practitionerDetails.content'

export const practitionerDetailsSchema = z.object({
    phone: z.string().optional(),

    email: z
        .string()
        .email(content.errorEmailInvalid)
        .optional()
        .or(z.literal('')),

    specialty: z
        .string()
        .min(2, content.errorSpecialtyTooShort)
        .max(50, content.errorSpecialtyTooLong)
        .trim(),

    outpatientFacility: z.string().optional(),

    availableTime: z.array(
        z.object({
            daysOfWeek: z.string().min(1, content.errorDaysOfWeekRequired),
            startTime: z.string().min(1, content.errorStartTimeRequired),
            endTime: z.string().min(1, content.errorEndTimeRequired),
        })
    ),
})
