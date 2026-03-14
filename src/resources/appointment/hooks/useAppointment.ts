import { useQuery } from '@tanstack/react-query'
import { getListPatients } from '@resources/patient/services/patient.service'
import { getListPractitioners } from '@resources/practitioner/services/practitioner.service'
import { fhirToAppointment } from '@resources/appointment/domain/appointment.adapter'
import { getListAppointments } from '@resources/appointment/services/appointment.service'
import {
    addDays,
    isSameDay,
    getKey,
    byStart,
} from '@resources/appointment/utils/clinicalAppointment.utils'

export const useAppointments = () => {
    const today = new Date()
    const tomorrow = addDays(today, 1)
    const todayStr = getKey(today)

    const patients = useQuery({
        queryKey: ['listPatients'],
        queryFn: () => getListPatients(),
    })

    const practitioners = useQuery({
        queryKey: ['listPractitioners'],
        queryFn: () => getListPractitioners(),
    })

    const appointments = useQuery({
        queryKey: ['listAppointments', todayStr],
        queryFn: () => getListAppointments({ date: todayStr }),
        enabled: !!patients.data && !!practitioners.data,
        select: (data) => {
            const all = data.map((appointment) =>
                fhirToAppointment(
                    appointment,
                    patients.data ?? [],
                    practitioners.data ?? []
                )
            )

            return {
                today: all
                    .filter((a) => isSameDay(new Date(a.start), today))
                    .sort(byStart),
                tomorrow: all
                    .filter((a) => isSameDay(new Date(a.start), tomorrow))
                    .sort(byStart),
                rest: all
                    .filter((a) => {
                        const d = new Date(a.start)
                        return !isSameDay(d, today) && !isSameDay(d, tomorrow)
                    })
                    .sort(byStart),
            }
        },
    })

    return {
        todayAppointments: appointments.data?.today ?? [],
        tomorrowAppointments: appointments.data?.tomorrow ?? [],
        restAppointments: appointments.data?.rest ?? [],
        isPending:
            patients.isPending ||
            practitioners.isPending ||
            appointments.isPending,
        isError:
            patients.isError || practitioners.isError || appointments.isError,
        error: patients.error || practitioners.error || appointments.error,
    }
}
