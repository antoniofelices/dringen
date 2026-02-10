import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogger } from '@shared/hooks/useLogger'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
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
                <FormFieldInput
                    control={form.control}
                    fieldName="dni"
                    label={content.labelDNI}
                    placeholder="12121212P"
                    type="text"
                />
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
