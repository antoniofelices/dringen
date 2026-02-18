import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { PatientType } from '@resources/patient/types/patient.model'
import { useUpdatePatientDemographics } from '@resources/patient/hooks/useUpdatePatient'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import type { PatientDemographicsFormType } from '@resources/patient/types/patient.model'
import content from './PatientDemographics.content'

const { genderOptions, maritalStatusOptions } = content

const PatientDemographicsForm = ({
    patientData,
    onSuccess,
}: {
    patientData: PatientType
    onSuccess: () => void
}) => {
    const updatePatient = useUpdatePatientDemographics(patientData.id)

    const form = useForm<PatientDemographicsFormType>({
        defaultValues: {
            firstName: patientData.firstName || '',
            lastName: patientData.lastName || '',
            gender: patientData.gender || '',
            maritalStatus: patientData.maritalStatus || '',
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="firstName"
                        label={content.labelFirstName}
                        type="text"
                    />
                    <FormFieldInput
                        control={form.control}
                        fieldName="lastName"
                        label={content.labelLastName}
                        type="text"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldCombobox
                        control={form.control}
                        fieldName="gender"
                        label={content.labelGender}
                        options={genderOptions}
                    />
                    <FormFieldCombobox
                        control={form.control}
                        fieldName="maritalStatus"
                        label={content.labelMaritalStatus}
                        options={maritalStatusOptions}
                    />
                </div>
                <Button
                    type="submit"
                    className="mt-4"
                    size="sm"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting
                        ? content.textButtonSending
                        : content.textButtonSend}
                </Button>
            </form>
        </Form>
    )
}

export default PatientDemographicsForm
