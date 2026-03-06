import type { z } from 'zod'
import type { bookAppointmentSchema } from '@workflows/clinical-appointment/schemas/bookAppointment.schema'

export type BookAppointmentFormType = z.infer<typeof bookAppointmentSchema>
