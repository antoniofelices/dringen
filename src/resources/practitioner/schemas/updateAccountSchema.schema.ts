import { z } from 'zod'
import content from './addNewPractitioner.content'

export const updateAccountSchema = z.object({
    userName: z
        .string()
        .min(3, content.errorUserNameTooShort)
        .max(20, content.errorUserNameTooLong)
        .optional(),
    userLastName: z
        .string()
        .min(3, content.errorUserLastNameTooShort)
        .max(20, content.errorUserLastNameTooLong)
        .optional(),
    email: z
        .string()
        .email(content.errorEmailInvalid)
        .min(1, content.errorEmailRequired)
        .optional(),
})
