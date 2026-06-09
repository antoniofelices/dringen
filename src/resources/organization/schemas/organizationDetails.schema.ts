import { z } from 'zod'
import { contentES as content } from './organizationDetails.content'

export const organizationDetailsSchema = z.object({
    name: z.string().min(1, content.errorNameRequired).trim(),
    type: z.string().trim(),
    identifier: z.string().trim(),
    address: z.string().trim(),
    phone: z.string().trim(),
    email: z
        .string()
        .email(content.errorEmailInvalid)
        .or(z.literal(''))
        .optional(),
    adminPhone: z.string().trim(),
    adminEmail: z
        .string()
        .email(content.errorAdminEmailInvalid)
        .or(z.literal(''))
        .optional(),
})
