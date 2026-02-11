import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogger } from '@shared/hooks/useLogger'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import FormFieldCalendar from '@shared/components/ui/FormFieldCalendar'
import { addNewPatientSchema } from '@resources/patient/schemas/addNewPatient.schema'
import { useCreatePatient } from '@resources/patient/hooks/useCreatePatient'
import type { AddNewPatientType } from '@resources/patient/types/patient.model'
import content from './AddNewPatientForm.content'

const AddNewPatientForm = () => {
    const { logError, logSuccess } = useLogger('RegisterPatientForm')
    const navigate = useNavigate()
    const createPatient = useCreatePatient()

    const form = useForm<AddNewPatientType>({
        resolver: zodResolver(addNewPatientSchema),
        defaultValues: {
            userName: '',
            userLastName: '',
            dni: '',
            email: '',
            phone: '',
            gender: undefined,
            birthDate: undefined,
        },
    })

    const onSubmit = async (formData: AddNewPatientType) => {
        try {
            const patient = await createPatient.mutateAsync(formData)
            logSuccess(content.textToastSuccess, content.title)
            navigate({ to: `/patient/${patient.id}` })
        } catch (error) {
            logError(content.textToastFail, error, content.title)
            toast.error(content.textToastFail)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="userName"
                        label={content.labelUserName}
                        type="text"
                    />
                    <FormFieldInput
                        control={form.control}
                        fieldName="userLastName"
                        label={content.labelUserLastName}
                        type="text"
                    />
                </div>
                <FormFieldInput
                    control={form.control}
                    fieldName="dni"
                    label={content.labelDNI}
                    placeholder="12121212P"
                    type="text"
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldCombobox
                        control={form.control}
                        fieldName="gender"
                        label={content.labelGender}
                        options={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                            { label: 'Other', value: 'other' },
                            { label: 'Unknown', value: 'unknown' },
                        ]}
                    />
                    <FormFieldCalendar
                        control={form.control}
                        fieldName="birthDate"
                        label={content.labelBirthday}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="email"
                        label={content.labelEmail}
                        type="email"
                    />
                    <FormFieldInput
                        control={form.control}
                        fieldName="phone"
                        label={content.labelPhone}
                        type="text"
                    />
                </div>
                <Button type="submit" className="w-full mt-4">
                    {form.formState.isSubmitting
                        ? content.textButtonSending
                        : content.textButtonSend}
                </Button>
            </form>
            {form.formState.errors.root && (
                <div className="text-red text-sm mt-2 text-center">
                    {form.formState.errors.root.message}
                </div>
            )}
        </Form>
    )
}

export default AddNewPatientForm
