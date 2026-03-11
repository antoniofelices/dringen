import { useQuery } from '@tanstack/react-query'
import { getAppointmentsByPatient } from '@resources/appointment/services/appointment.service'
import { getListPractitioners } from '@resources/practitioner/services/practitioner.service'
import { fhirToAppointment } from '@resources/appointment/domain/appointment.adapter'
import {
    byStart,
    byStartDesc,
} from '@resources/appointment/utils/clinicalAppointment.utils'

export const useAppointmentsByPatient = (patientId: string) => {
    const practitioners = useQuery({
        queryKey: ['listPractitioners'],
        queryFn: () => getListPractitioners(),
    })

    const appointments = useQuery({
        queryKey: ['appointmentsByPatient', patientId],
        queryFn: () => getAppointmentsByPatient(patientId),
        enabled: !!practitioners.data,
        select: (data) => {
            const now = new Date()
            const all = data.map((appointment) =>
                fhirToAppointment(appointment, [], practitioners.data ?? [])
            )
            return {
                booked: all
                    .filter((a) => new Date(a.start) >= now)
                    .sort(byStart),
                past: all
                    .filter((a) => new Date(a.start) < now)
                    .sort(byStartDesc),
            }
        },
    })

    return {
        bookedAppointments: appointments.data?.booked ?? [],
        pastAppointments: appointments.data?.past ?? [],
        isPending: practitioners.isPending || appointments.isPending,
        isError: practitioners.isError || appointments.isError,
        error: practitioners.error || appointments.error,
    }
}
