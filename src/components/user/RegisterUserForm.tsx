import {
    IdCard,
    Lock,
    LockKeyhole,
    Mail,
    User,
    UserRoundCog,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUser } from '@/services/supabaseAdmin'
import mapSupabaseError from '@/services/mapSupabaseErrors'
import { Button } from '@/components/ui/base/button'
import FormFieldInput from '@components/ui/FormFieldInput'
import FormFieldSelect from '@components/ui/FormFieldSelect'
import content from '@/config/data/user/registerForm'

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
        dni: z
            .string()
            .min(9, content.errorUserDniTooShort)
            .max(9, content.errorUserDniTooLong)
            .regex(/^\d{8}[A-Z]$/, content.errorUserDniInvalidFormat),
        email: z
            .string()
            .email(content.errorEmailInvalid)
            .min(1, content.errorEmailRequired),
        role: z.enum(['user', 'medical_office', 'physician', 'admin']),
        password: z
            .string()
            .min(8, content.errorPasswordTooShort)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).*$/,
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
        control,
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            role: 'user',
        },
    })

    const onSubmit = async (data: FormData) => {
        try {
            console.log('Datos enviados:', data)

            const { error } = await createUser({
                email: data.email,
                password: data.password,
                user_name: data.userName,
                user_last_name: data.userLastName,
                dni: data.dni,
                role: data.role,
            })
            if (error) {
                console.error('Error de Supabase:', error)
                const { field, message } = mapSupabaseError(error.message)
                setError(field, {
                    type: 'server',
                    message,
                })
                return
            }
            console.log('Usuario creado exitosamente!')
        } catch (err) {
            console.error('Error en onSubmit:', err)
            setError('root', {
                type: 'server',
                message: 'Error inesperado al crear el usuario',
            })
        }
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
                    fieldName="dni"
                    icon={IdCard}
                    label={content.labelDNI}
                    placeholder="12121212P"
                    register={register}
                    type="text"
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
                    control={control}
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
