import { useQuery } from '@tanstack/react-query'
import { getListPatients } from '@resources/patient/services/patient.service'
import { fhirToAppointment } from '@resources/appointment/domain/appointment.adapter'
import { getAppointmentsByPractitionerForDate } from '@resources/appointment/services/appointment.service'
import {
    isSameDay,
    getKey,
    byStart,
} from '@resources/appointment/utils/clinicalAppointment.utils'

export const useAppointmentsByPractitioner = (practitionerId: string) => {
    const today = new Date()
    const todayStr = getKey(today)

    const patients = useQuery({
        queryKey: ['listPatients'],
        queryFn: () => getListPatients(),
    })

    const appointments = useQuery({
        queryKey: ['appointmentsByPractitioner', practitionerId, todayStr],
        queryFn: () =>
            getAppointmentsByPractitionerForDate(practitionerId, todayStr),
        enabled: !!practitionerId && !!patients.data,
        select: (data) =>
            data
                .map((appt) =>
                    fhirToAppointment(appt, patients.data ?? [], [])
                )
                .filter((a) => isSameDay(new Date(a.start), today))
                .sort(byStart),
    })

    return {
        todayAppointments: appointments.data ?? [],
        isPending: patients.isPending || appointments.isPending,
        isError: patients.isError || appointments.isError,
        error: patients.error || appointments.error,
    }
}
