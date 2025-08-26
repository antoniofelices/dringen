import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerHealthConsumer } from '@/services/supabaseService'
import mapSupabaseError from '@/services/mapSupabaseErrors'
import type { PostgrestError } from '@supabase/supabase-js'
import { Button } from '@/components/ui/base/button'
import { Form } from '@components/ui/base/form'
import FormFieldInputControl from '@/components/ui/FormFieldInputControl'
import content from '@/config/data/health-consumer/registerForm'

const registerHealthConsumerSchema = z.object({
    userName: z
        .string()
        .min(3, content.errorUserNameTooShort)
        .max(20, content.errorUserNameTooLong)
        .regex(/^[a-zA-Z0-9_]+$/, content.errorUserNameDisallowedCharacters),
    userLastName: z
        .string()
        .min(3, content.errorUserLastNameTooShort)
        .max(20, content.errorUserLastNameTooLong)
        .regex(
            /^[a-zA-Z0-9_]+$/,
            content.errorUserLastNameDisallowedCharacters
        ),
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

type FormData = z.infer<typeof registerHealthConsumerSchema>

const RegisterHealthConsumerForm = () => {
    const navigate = useNavigate()

    const form = useForm<FormData>({
        resolver: zodResolver(registerHealthConsumerSchema),
        defaultValues: {
            userName: '',
            userLastName: '',
            dni: '',
            email: '',
            phone: '',
            placeOfResidence: '',
        },
    })

    const onSubmit = async (formData: FormData) => {
        try {
            const data = await registerHealthConsumer(
                formData.userName,
                formData.userLastName,
                formData.dni,
                formData.email,
                formData.phone,
                formData.placeOfResidence
            )
            navigate({ to: `/health-consumer/${data[0].id}` })
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
                <FormFieldInputControl
                    control={form.control}
                    fieldName="userName"
                    label={content.labelUserName}
                    placeholder=""
                    type="text"
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="userLastName"
                    label={content.labelUserLastName}
                    placeholder=""
                    type="text"
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="email"
                    label={content.labelEmail}
                    placeholder=""
                    type="email"
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="dni"
                    label={content.labelDNI}
                    placeholder="12121212P"
                    type="text"
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="phone"
                    label={content.labelPhone}
                    placeholder=""
                    type="text"
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="placeOfResidence"
                    label={content.labelPlaceOfResidence}
                    placeholder=""
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

export default RegisterHealthConsumerForm
