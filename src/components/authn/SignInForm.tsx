import { toast } from 'sonner'
import { Mail, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithPassword } from '@/services/supabaseService'
import mapSupabaseError from '@/services/mapSupabaseErrors'
import { Button } from '@/components/ui/base/button'
import { Form } from '@components/ui/base/form'
import FormFieldInput from '@/components/ui/FormFieldInput'
import content from '@/config/data/authn/signInForm'

const signInSchema = z.object({
    email: z
        .string()
        .min(1, content.errorEmailRequired)
        .email(content.errorEmailInvalid),
    password: z.string().min(6, content.errorPasswordTooShort),
})

type FormData = z.infer<typeof signInSchema>

const SignInForm = () => {
    const defaultValues = {
        email: '',
        password: '',
    }
    const navigate = useNavigate()

    const form = useForm<FormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = async (formData: FormData) => {
        try {
            const { error } = await signInWithPassword(
                formData.email,
                formData.password
            )
            if (error) {
                const { message } = mapSupabaseError(error.message)

                form.setError('root', {
                    type: 'server',
                    message,
                })
                toast.error(`${content.textToastFail}: ${message}`)
                return
            }
            navigate({ to: '/patient/list' })
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : content.textToastFail
            const { message } = mapSupabaseError(errorMessage)

            form.setError('root', {
                type: 'server',
                message,
            })
            toast.error(`${content.textToastFail}: ${message}`)
            return
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldInput
                    control={form.control}
                    fieldName="email"
                    icon={Mail}
                    label={content.labelEmail}
                    type="email"
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="password"
                    icon={Lock}
                    label={content.labelPassword}
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

export default SignInForm
