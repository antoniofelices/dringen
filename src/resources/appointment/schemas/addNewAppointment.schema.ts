import { z } from 'zod'
import content from './addNewAppointment.content'

export const addNewAppointmentSchema = z.object({
    patient: z.string().min(1, content.errorPatientRequired),
    physician: z.string().min(1, content.errorPhysicianRequired),
    appointmentDate: z.date(),
    appointmentTime: z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, content.errorInvalidTime),
    notes: z.string().optional(),
})
