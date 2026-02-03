import { useForm } from 'react-hook-form'
// import { useNavigate } from '@tanstack/react-router'
// import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
// import { useLogger } from '@shared/hooks/useLogger'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import content from './AddNewPatientForm.content'
import { addNewPatientSchema } from '../schemas/addNewPatient.schema'

type FormData = z.infer<typeof addNewPatientSchema>

const AddNewPatientForm = () => {
    // const { logError, logSuccess } = useLogger('RegisterPatientForm')

    // const navigate = useNavigate()

    const defaultValues = {
        userName: '',
        userLastName: '',
        dni: '',
        email: '',
        phone: '',
        placeOfResidence: '',
    }

    const form = useForm<FormData>({
        resolver: zodResolver(addNewPatientSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = () => {
        return
    }

    // const onSubmit = async (formData: FormData) => {
    //     try {
    //         const data = await registerPatient(
    //             formData.userName,
    //             formData.userLastName,
    //             formData.dni,
    //             formData.email,
    //             formData.phone,
    //             formData.placeOfResidence
    //         )
    //         navigate({ to: `/patient/${data[0].id}` })
    //         logSuccess(content.textToastSuccess, content.title)
    //     } catch (error) {
    //         logError(content.textToastFail, error, content.title)
    //         toast.error(content.textToastFail)
    //         return
    //     }
    // }

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
                    fieldName="email"
                    label={content.labelEmail}
                    type="email"
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
                    fieldName="phone"
                    label={content.labelPhone}
                    type="text"
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="placeOfResidence"
                    label={content.labelPlaceOfResidence}
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
