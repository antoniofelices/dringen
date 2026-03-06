import { z } from 'zod'
import content from './bookAppointment.content'

export const bookAppointmentSchema = z.object({
    patient: z.string().min(1, content.errorPatientRequired),
    slotId: z.string().min(1, content.errorSlotRequired),
    notes: z.string().optional(),
})
