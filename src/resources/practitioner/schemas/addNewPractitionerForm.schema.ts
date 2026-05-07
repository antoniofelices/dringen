import { z } from 'zod'
import {
    roleOptions,
    specialtyOptions,
} from '@resources/practitioner/config/config'
import { GENDER_VALUES, DAYS_OF_WEEK_VALUES } from '@shared/fhir/valueSets.domain'
import content from './addNewPractitionerForm.content'

export const addNewPractitionerFormSchema = z.object({
    firstName: z
        .string()
        .min(2, content.errorFirstNameTooShort)
        .max(50, content.errorFirstNameTooLong),
    lastName: z
        .string()
        .min(2, content.errorLastNameTooShort)
        .max(50, content.errorLastNameTooLong),
    email: z
        .string()
        .email(content.errorEmailInvalid)
        .min(1, content.errorEmailRequired),
    phone: z.string().optional(),
    birthDate: z.date().optional(),
    gender: z.enum(GENDER_VALUES).optional(),
    role: z.enum(roleOptions, { error: content.errorRoleRequired }),
    availableTime: z.array(
        z.object({
            daysOfWeek: z.enum(DAYS_OF_WEEK_VALUES, { error: content.errorDaysOfWeekRequired }),
            startTime: z.string().min(1, content.errorStartTimeRequired),
            endTime: z.string().min(1, content.errorEndTimeRequired),
        })
    ),
    locationId: z.string().optional(),
    specialty: z.enum(specialtyOptions, { error: content.errorSpecialtyRequired }).optional(),
})
