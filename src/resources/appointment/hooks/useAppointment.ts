import { useQuery } from '@tanstack/react-query'
import { getListAppointments } from '@resources/appointment/services/appointment.service'
import { getListPatients } from '@resources/patient/services/patient.service'
import { getListPractitioners } from '@resources/practitioner/services/practitioner.service'
import { fhirToAppointment } from '@resources/appointment/domain/appointment.adapter'

export const useAppointments = () => {
    const patients = useQuery({
        queryKey: ['listPatients'],
        queryFn: () => getListPatients(),
    })

    const practitioners = useQuery({
        queryKey: ['listPractitioners'],
        queryFn: () => getListPractitioners(),
    })

    const appointments = useQuery({
        queryKey: ['listAppointments'],
        queryFn: () => getListAppointments(),
        enabled: !!patients.data && !!practitioners.data,
        select: (data) =>
            data.map((appointment) =>
                fhirToAppointment(
                    appointment,
                    patients.data ?? [],
                    practitioners.data ?? []
                )
            ),
    })

    return {
        appointments: appointments.data,
        isPending:
            patients.isPending ||
            practitioners.isPending ||
            appointments.isPending,
        isError:
            patients.isError ||
            practitioners.isError ||
            appointments.isError,
        error: patients.error || practitioners.error || appointments.error,
    }
}
