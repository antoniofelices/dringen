import { z } from 'zod'
import content from './addNewPatient.content'

export const addNewPatientSchema = z.object({
    userName: z
        .string()
        .min(2, content.errorUserNameTooShort)
        .max(20, content.errorUserNameTooLong)
        .trim(),

    userLastName: z
        .string()
        .min(2, content.errorUserLastNameTooShort)
        .max(20, content.errorUserLastNameTooLong)
        .trim(),

    email: z
        .string()
        .min(1, content.errorEmailRequired)
        .email(content.errorEmailInvalid)
        .toLowerCase()
        .trim(),

    dni: z
        .string()
        .min(9, content.errorUserDniTooShort)
        .max(9, content.errorUserDniTooLong)
        .regex(/^\d{8}[A-Z]$/, content.errorUserDniInvalidFormat),

    gender: z.enum(['male', 'female', 'other', 'unknown'], {
        error: content.errorGenderRequired,
    }),

    birthDate: z
        .date({
            error: content.errorBirthDateRequired,
        })
        .max(new Date(), content.errorBirthDateFuture)
        .min(new Date('1900-01-01'), content.errorBirthDateTooOld),

    phone: z
        .string()
        .regex(/^(\+?\d{7,15})?$/, content.errorPhoneInvalid)
        .optional(),

    placeOfResidence: z.string().min(1).optional(),
})
