import { z } from 'zod'
import content from './auth.content'

export const signInSchema = z.object({
    email: z
        .string()
        .min(1, content.errorEmailRequired)
        .email(content.errorEmailInvalid),
    password: z.string().min(6, content.errorPasswordTooShort),
})
