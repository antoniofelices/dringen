import type { Appointment, Patient, Practitioner } from '@medplum/fhirtypes'
import type { AppointmentType } from '@resources/appointment/types/appointment.model'
import { CALLED_EXTENSION_URL } from '@resources/appointment/config/config'

export function fhirToAppointment(
    appointment: Appointment,
    patients: Patient[],
    practitioners: Practitioner[]
): AppointmentType {
    const patientRef = appointment.participant?.find((p) =>
        p.actor?.reference?.startsWith('Patient/')
    )
    const patientId = patientRef?.actor?.reference?.split('/')[1] ?? ''
    const patient = patients.find((p) => p.id === patientId)
    const patientName = patient
        ? `${patient.name?.[0]?.family ?? ''} ${patient.name?.[0]?.given?.[0] ?? ''}`.trim()
        : ''
    const patientPhone =
        patient?.telecom?.find((t) => t.system === 'phone')?.value ?? ''

    const practitionerRef = appointment.participant?.find((p) =>
        p.actor?.reference?.startsWith('Practitioner/')
    )
    const practitionerId =
        practitionerRef?.actor?.reference?.split('/')[1] ?? ''
    const practitioner = practitioners.find((p) => p.id === practitionerId)
    const practitionerName = practitioner
        ? `${practitioner.name?.[0]?.family ?? ''} ${practitioner.name?.[0]?.given?.[0] ?? ''}`.trim()
        : ''

    const called =
        appointment.extension?.find((e) => e.url === CALLED_EXTENSION_URL)
            ?.valueBoolean ?? false

    return {
        id: appointment.id ?? '',
        status: appointment.status ?? '',
        start: appointment.start ?? '',
        end: appointment.end ?? '',
        patientId,
        patientName,
        patientPhone,
        practitionerId,
        practitionerName,
        notes: appointment.description ?? '',
        called,
    }
}
