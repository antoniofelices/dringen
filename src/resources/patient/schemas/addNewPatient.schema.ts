import { z } from 'zod'
import content from './addNewPatient.content'

export const addNewPatientSchema = z.object({
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
    phone: z.string().optional(),
    placeOfResidence: z.string().optional(),
})
