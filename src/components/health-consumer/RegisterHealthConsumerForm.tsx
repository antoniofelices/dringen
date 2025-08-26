import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerHealthConsumer } from '@/services/supabaseService'
import mapSupabaseError from '@/services/mapSupabaseErrors'
import type { PostgrestError } from '@supabase/supabase-js'
import { Button } from '@/components/ui/base/button'
import FormFieldInput from '@components/ui/FormFieldInput'
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

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(registerHealthConsumerSchema),
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
            setError(field, {
                type: 'server',
                message,
            })
            return
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFieldInput
                    errors={errors}
                    fieldName="userName"
                    label={content.labelUserName}
                    placeholder=""
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="userLastName"
                    label={content.labelUserLastName}
                    placeholder=""
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="email"
                    label={content.labelEmail}
                    placeholder=""
                    register={register}
                    type="email"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="dni"
                    label={content.labelDNI}
                    placeholder="12121212P"
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="phone"
                    label={content.labelPhone}
                    placeholder=""
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="placeOfResidence"
                    label={content.labelPlaceOfResidence}
                    placeholder=""
                    register={register}
                    type="text"
                />
                <Button type="submit" className="w-full mt-4">
                    {isSubmitting
                        ? content.textButtonSending
                        : content.textButtonSend}
                </Button>
            </form>
            {errors.root && (
                <div className="text-red text-sm mt-2 text-center">
                    {errors.root.message}
                </div>
            )}
        </>
    )
}

export default RegisterHealthConsumerForm
