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
import { Form } from '@components/ui/base/form'
import FormFieldInputControl from '@/components/ui/FormFieldInputControl'
import FormFieldSelectControl from '@components/ui/FormFieldSelectControl'
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
    const form = useForm<FormData>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            email: '',
            password: '',
            userName: '',
            userLastName: '',
            dni: '',
            role: 'user',
        },
    })

    const onSubmit = async (formData: FormData) => {
        try {
            console.log('Datos enviados:', formData)

            const { error } = await createUser({
                email: formData.email,
                password: formData.password,
                user_name: formData.userName,
                user_last_name: formData.userLastName,
                dni: formData.dni,
                role: formData.role,
            })
            if (error) {
                console.error('Error de Supabase:', error)
                const { field, message } = mapSupabaseError(error.message)
                form.setError(field, {
                    type: 'server',
                    message,
                })
                return
            }
            console.log('Usuario creado exitosamente!')
        } catch (err) {
            console.error('Error en onSubmit:', err)
            form.setError('root', {
                type: 'server',
                message: 'Error inesperado al crear el usuario',
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldInputControl
                    control={form.control}
                    fieldName="userName"
                    icon={User}
                    label={content.labelUserName}
                    placeholder="Manolo"
                    type="text"
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="userLastName"
                    icon={User}
                    label={content.labelUserLastName}
                    placeholder="Kabezabolo"
                    type="text"
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="email"
                    icon={Mail}
                    label={content.labelEmail}
                    placeholder="nf@manolo.es"
                    type="email"
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="dni"
                    icon={IdCard}
                    label={content.labelDNI}
                    placeholder="12121212P"
                    type="text"
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="password"
                    icon={Lock}
                    label={content.labelPassword}
                    type="password"
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="confirmPassword"
                    icon={LockKeyhole}
                    label={content.labelConfirmPassword}
                    type="password"
                />
                <FormFieldSelectControl
                    control={form.control}
                    fieldName="role"
                    icon={UserRoundCog}
                    label={content.labelSelectRole}
                    options={['user', 'medical_office', 'physician', 'admin']}
                    placeholder="User"
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

export default RegisterUserForm
