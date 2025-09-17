import { format, parse, startOfWeek, getDay } from 'date-fns'
import type { Event } from 'react-big-calendar'
import { dateFnsLocalizer } from 'react-big-calendar'
import { es } from 'date-fns/locale/es'

export type MedicalUser = {
    user_name: string
    user_last_name: string
}

export type MedicalPatient = {
    user_name: string
    user_last_name: string
}

export type Appointment = {
    id: string
    appointment_date: string
    medical_patient: MedicalPatient
    medical_user: MedicalUser
}

const locales = {
    'es-ES': es,
}

export const calendarLocalizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export const transformAppointmentsToEvents = (
    appointments: Appointment[]
): Event[] => {
    return (
        appointments?.map((appt) => ({
            title: `${appt.medical_patient.user_name} ${appt.medical_patient.user_last_name} - Dra. ${appt.medical_user.user_last_name}`,
            start: new Date(appt.appointment_date),
            end: new Date(
                new Date(appt.appointment_date).getTime() + 30 * 60000
            ),
            resource: appt,
        })) || []
    )
}

export const formEventData = (event: Event): string => {
    return format(event.start as Date, 'dd/MM/yyyy - HH:mm', {
        locale: es,
    })
}
