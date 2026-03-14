import { addNewAppointmentSchema } from './addNewAppointment.schema'

export const addNewAppointmentByPatientSchema = addNewAppointmentSchema.omit({
    patient: true,
})
