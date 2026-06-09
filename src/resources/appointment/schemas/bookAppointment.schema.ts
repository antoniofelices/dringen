import { z } from 'zod'
import { contentES as content } from './bookAppointment.content'

export const bookAppointmentSchema = z.object({
    patient: z.string().min(1, content.errorPatientRequired),
    notes: z.string().optional(),
})
