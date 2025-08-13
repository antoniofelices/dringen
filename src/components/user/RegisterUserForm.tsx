import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, LockKeyhole, User, UserRoundCog } from 'lucide-react'

import content from '@/config/data/authz/registerUserForm'
import { Button } from '@/components/ui/base/button'

import FormFieldInput from '@components/ui/FormFieldInput'
import FormFieldSelect from '@components/ui/FormFieldSelect'
// import { registerUser } from '@/services/supabaseService'
// import mapSupabaseError from '@/services/mapSupabaseErrors'

const registerUserSchema = z
    .object({
        userName: z
            .string()
            .min(3, content.errorUserNameTooShort)
            .max(20, content.errorUserNameTooLong)
            .regex(
                /^[a-zA-Z0-9_]+$/,
                content.errorUserNameDisallowedCharacters
            ),
        userLastName: z
            .string()
            .min(3, content.errorUserLastNameTooShort)
            .max(20, content.errorUserLastNameTooLong)
            .regex(
                /^[a-zA-Z0-9_]+$/,
                content.errorUserLastNameDisallowedCharacters
            ),
        email: z
            .string()
            .email(content.errorEmailInvalid)
            .min(1, content.errorEmailRequired),
        password: z
            .string()
            .min(8, content.errorPasswordTooShort)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                content.errorPasswordMustContain
            ),
        confirmPassword: z.string().min(1, content.confirmPassword),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: content.errorPasswordNoMatch,
        path: ['confirmPassword'],
    })

type FormData = z.infer<typeof registerUserSchema>

const RegisterUserForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(registerUserSchema),
    })

    const onSubmit = async (data: FormData) => {
        // const { error } = await registerUser(
        //     data.email,
        //     data.password,
        //     data.username
        // )
        // if (error) {
        //     const { field, message } = mapSupabaseError(error.message)
        //     setError(field, {
        //         type: 'server',
        //         message,
        //     })
        //     return
        // }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFieldInput
                    errors={errors}
                    fieldName="userName"
                    icon={User}
                    label={content.labelUserName}
                    placeholder="Manolo"
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="userLastName"
                    icon={User}
                    label={content.labelUserLastName}
                    placeholder="Kabezabolo"
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="email"
                    icon={Mail}
                    label={content.labelEmail}
                    placeholder="nf@manolo.es"
                    register={register}
                    type="email"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="password"
                    icon={Lock}
                    label={content.labelPassword}
                    register={register}
                    type="password"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="confirmPassword"
                    icon={LockKeyhole}
                    label={content.labelConfirmPassword}
                    register={register}
                    type="password"
                />
                <FormFieldSelect
                    errors={errors}
                    fieldName="role"
                    icon={UserRoundCog}
                    label={content.labelSelectRole}
                    options={['user', 'medical_office', 'physician', 'admin']}
                    placeholder="User"
                    register={register}
                />
                <Button type="submit" className="w-full">
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

export default RegisterUserForm
