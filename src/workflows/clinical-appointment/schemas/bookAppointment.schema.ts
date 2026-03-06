import { z } from 'zod'
import content from './bookAppointment.content'

export const bookAppointmentSchema = z.object({
    patient: z.string().min(1, content.errorPatientRequired),
    notes: z.string().optional(),
})
