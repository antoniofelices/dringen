import { z } from 'zod'
import { contentES as content } from './addNewCommunication.content'

export const addNewCommunicationSchema = z.object({
    title: z.string().min(1, content.errorTitleRequired).trim(),
    content: z.string().min(1, content.errorContentRequired).trim(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    location: z.string().trim().optional(),
})
