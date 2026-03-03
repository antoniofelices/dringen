import { z } from 'zod'
import content from './practitionerDetails.content'

export const practitionerDetailsSchema = z.object({
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
