import { usePatientsByPractitioner } from '@resources/patient/hooks/useGetPatient'
import { useBookAppointment } from '@workflows/clinical-appointment/hooks/useBookAppointment'
import type { SelectedSlot } from '@workflows/clinical-appointment/types/clinicalAppointment.model'

export const useConfirmationBar = (
    practitionerId: string,
    selected: SelectedSlot,
    onCancel: () => void
) => {
    const { patients } = usePatientsByPractitioner(practitionerId)
    const { form, onSubmit, isSubmitting } = useBookAppointment(
        practitionerId,
        selected,
        onCancel
    )

    const patientOptions = (patients ?? []).map((p) => ({
        label: `${p.firstName} ${p.lastName}`,
        value: p.id,
    }))

    const patientValue = form.watch('patient')

    return {
        form,
        onSubmit,
        isSubmitting,
        patientOptions,
        patientValue,
    }
}
