import { toast } from 'sonner'
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
import { USERROLES } from '@/config/config.ts'
import { useLogger } from '@/hooks/useLogger'
import { Button } from '@/components/ui/base/button'
import { Form } from '@components/ui/base/form'
import FormFieldInput from '@/components/ui/FormFieldInput'
import FormFieldSelect from '@/components/ui/FormFieldSelect'
import content from '@/config/data/user/registerForm'

const registerUserSchema = z
    .object({
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
        role: z.enum(USERROLES),
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
    const { logError, logSuccess } = useLogger('RegisterUserForm')

    const defaultValues = {
        email: '',
        password: '',
        confirmPassword: '',
        userName: '',
        userLastName: '',
        dni: '',
        role: 'user' as const,
    }

    const form = useForm<FormData>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = async (formData: FormData) => {
        try {
            const newUser = await createUser({
                email: formData.email,
                password: formData.password,
                user_name: formData.userName,
                user_last_name: formData.userLastName,
                dni: formData.dni,
                role: formData.role,
            })
            toast.success(content.textToastSuccess)
            logSuccess(content.textToastSuccess, content.title)
            form.reset()
            return newUser
        } catch (error) {
            logError(content.textToastFail, error, content.title)
            toast.error(content.textToastFail)
            return
        }
    }

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
                <FormFieldSelect
                    control={form.control}
                    fieldName="role"
                    icon={UserRoundCog}
                    label={content.labelSelectRole}
                    options={USERROLES}
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
