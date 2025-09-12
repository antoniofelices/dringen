import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerPatient } from '@/services/supabaseService'
import mapSupabaseError from '@/services/mapSupabaseErrors'
import type { PostgrestError } from '@supabase/supabase-js'
import { Button } from '@components/ui/base/button'
import { Form } from '@components/ui/base/form'
import FormFieldInput from '@components/ui/FormFieldInput'
import content from '@data/patient/registerForm'

const registerPatientSchema = z.object({
    userName: z
        .string()
        .min(3, content.errorUserNameTooShort)
        .max(20, content.errorUserNameTooLong),
    userLastName: z
        .string()
        .min(3, content.errorUserLastNameTooShort)
        .max(20, content.errorUserLastNameTooLong),
    dni: z
        .string()
        .min(9, content.errorUserDniTooShort)
        .max(9, content.errorUserDniTooLong)
        .regex(/^\d{8}[A-Z]$/, content.errorUserDniInvalidFormat),
    email: z
        .string()
        .email(content.errorEmailInvalid)
        .min(1, content.errorEmailRequired),
    phone: z.string().optional(),
    placeOfResidence: z.string().optional(),
})

type FormData = z.infer<typeof registerPatientSchema>

const RegisterPatientForm = () => {
    const navigate = useNavigate()

    const defaultValues = {
        userName: '',
        userLastName: '',
        dni: '',
        email: '',
        phone: '',
        placeOfResidence: '',
    }

    const form = useForm<FormData>({
        resolver: zodResolver(registerPatientSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = async (formData: FormData) => {
        try {
            const data = await registerPatient(
                formData.userName,
                formData.userLastName,
                formData.dni,
                formData.email,
                formData.phone,
                formData.placeOfResidence
            )
            navigate({ to: `/patient/${data[0].id}` })
        } catch (error) {
            const postgrestError = error as PostgrestError
            const { field, message } = mapSupabaseError(postgrestError.message)
            form.setError(field, {
                type: 'server',
                message,
            })
            return
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

export default RegisterPatientForm
