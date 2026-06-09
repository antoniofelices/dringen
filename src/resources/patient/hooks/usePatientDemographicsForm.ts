import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import type { PatientType, PatientDemographicsFormType } from '@resources/patient/types/patient.model'
import { patientDemographicsSchema } from '@resources/patient/schemas/patientDemographics.schema'
import { useUpdatePatientDemographics } from '@resources/patient/hooks/useUpdatePatient'
import { contentES as content } from '@resources/patient/components/PatientDemographics/PatientDemographics.content'

export const usePatientDemographicsForm = ({
    patientData,
    onSuccess,
}: {
    patientData: PatientType
    onSuccess: () => void
}) => {
    const updatePatient = useUpdatePatientDemographics(patientData.id)

    const form = useForm<PatientDemographicsFormType>({
        resolver: zodResolver(patientDemographicsSchema),
        defaultValues: {
            firstName: patientData.firstName || '',
            lastName: patientData.lastName || '',
            gender: patientData.gender || undefined,
            maritalStatus: patientData.maritalStatus || undefined,
        },
    })

    const onSubmit = async (formData: PatientDemographicsFormType) => {
        try {
            await updatePatient.mutateAsync(formData)
        } catch {
            toast.error(content.textToastFail)
            return
        }
        toast.success(content.textToastSuccess)
        onSuccess()
    }

    return { form, onSubmit }
}
