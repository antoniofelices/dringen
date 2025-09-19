import { toast } from 'sonner'
import { Lock, LockKeyhole } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordUser } from '@/services/supabaseService'
import { Button } from '@/components/ui/base/button'
import { Form } from '@components/ui/base/form'
import FormFieldInput from '@/components/ui/FormFieldInput'
import content from '@/config/data/authn/resetPasswordForm'

const resetPasswordSchema = z
    .object({
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

type FormData = z.infer<typeof resetPasswordSchema>

const ResetPasswordForm = () => {
    const defaultValues = {
        password: '',
        confirmPassword: '',
    }
    const navigate = useNavigate()

    const form = useForm<FormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = async (formData: FormData) => {
        try {
            await resetPasswordUser(formData.password)
            toast.success(content.textToastSuccess)
            navigate({ to: '/dashboard' })
            form.reset()
        } catch {
            toast.error(`${content.textToastFail}`)
            return
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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

export default ResetPasswordForm
