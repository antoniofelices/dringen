import { z } from 'zod'
import content from './addNewPractitioner.content'

export const addNewPractitionerSchema = z
    .object({
        userName: z
            .string()
            .min(3, content.errorUserNameTooShort)
            .max(20, content.errorUserNameTooLong),
        userLastName: z
            .string()
            .min(3, content.errorUserLastNameTooShort)
            .max(20, content.errorUserLastNameTooLong),
        dni: z
            .string()
            .min(9, content.errorUserDniTooShort)
            .max(9, content.errorUserDniTooLong)
            .regex(/^\d{8}[A-Z]$/, content.errorUserDniInvalidFormat),
        email: z
            .string()
            .email(content.errorEmailInvalid)
            .min(1, content.errorEmailRequired),
        password: z
            .string()
            .min(8, content.errorPasswordTooShort)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).*$/,
                content.errorPasswordMustContain
            ),
        confirmPassword: z.string().min(1, content.confirmPassword),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: content.errorPasswordNoMatch,
        path: ['confirmPassword'],
    })
