import type { Appointment, Patient } from '@medplum/fhirtypes'
import type { AppointmentType } from '@resources/appointment/types/appointment.model'

export function fhirToAppointment(
    appointment: Appointment,
    patients: Patient[]
): AppointmentType {
    const patientRef = appointment.participant?.find(
        (p) => p.actor?.reference?.startsWith('Patient/')
    )
    const patientId = patientRef?.actor?.reference?.split('/')[1] ?? ''
    const patient = patients.find((p) => p.id === patientId)
    const patientName = patient
        ? `${patient.name?.[0]?.given?.[0] ?? ''} ${patient.name?.[0]?.family ?? ''}`.trim()
        : ''

    const practitionerRef = appointment.participant?.find(
        (p) => p.actor?.reference?.startsWith('Practitioner/')
    )
    const practitionerId =
        practitionerRef?.actor?.reference?.split('/')[1] ?? ''
    const practitionerName =
        practitionerRef?.actor?.display ?? ''

    return {
        id: appointment.id ?? '',
        status: appointment.status ?? '',
        start: appointment.start ?? '',
        end: appointment.end ?? '',
        patientId,
        patientName,
        practitionerId,
        practitionerName,
        notes:
            appointment.description ?? '',
    }
}
