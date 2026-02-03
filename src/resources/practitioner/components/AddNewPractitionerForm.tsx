// import { toast } from 'sonner'
import { IdCard, Lock, LockKeyhole, Mail, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
// import { useLogger } from '@shared/hooks/useLogger'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import content from './AddNewPractitionerForm.content'
import { addNewPractitionerSchema } from '../schemas/addNewPractitioner.schema'

type FormData = z.infer<typeof addNewPractitionerSchema>

const AddNewPractitionerForm = () => {
    // const { logError, logSuccess } = useLogger('RegisterUserForm')

    const defaultValues = {
        email: '',
        password: '',
        confirmPassword: '',
        userName: '',
        userLastName: '',
        dni: '',
    }

    const form = useForm<FormData>({
        resolver: zodResolver(addNewPractitionerSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = () => {
        return
    }

    // const onSubmit = async (formData: FormData) => {
    //     try {
    //         const newUser = await createUser({
    //             email: formData.email,
    //             password: formData.password,
    //             user_name: formData.userName,
    //             user_last_name: formData.userLastName,
    //             dni: formData.dni,
    //         })
    //         toast.success(content.textToastSuccess)
    //         logSuccess(content.textToastSuccess, content.title)
    //         form.reset()
    //         return newUser
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
                    icon={User}
                    label={content.labelUserName}
                    placeholder="Manolo"
                    type="text"
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="userLastName"
                    icon={User}
                    label={content.labelUserLastName}
                    placeholder="Kabezabolo"
                    type="text"
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="email"
                    icon={Mail}
                    label={content.labelEmail}
                    placeholder="nf@manolo.es"
                    type="email"
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="dni"
                    icon={IdCard}
                    label={content.labelDNI}
                    placeholder="12121212P"
                    type="text"
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="password"
                    icon={Lock}
                    label={content.labelPassword}
                    type="password"
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="confirmPassword"
                    icon={LockKeyhole}
                    label={content.labelConfirmPassword}
                    type="password"
                />
                <Button type="submit" className="w-full">
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

export default AddNewPractitionerForm
