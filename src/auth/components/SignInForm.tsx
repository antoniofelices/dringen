import { toast } from 'sonner'
import { Mail, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import { signInSchema } from '@auth/schemas/auth.schema'
import { signIn } from '@auth/services/auth.service'
import type { SignInFormType } from '@auth/types/auth.model'
import content from './SignInForm.content'

const SignInForm = () => {
    const defaultValues = {
        email: '',
        password: '',
    }
    const navigate = useNavigate()

    const form = useForm<SignInFormType>({
        resolver: zodResolver(signInSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = async (formData: SignInFormType) => {
        try {
            await signIn(formData.email, formData.password)
            navigate({ to: '/dashboard' })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : content.textToastFail
            toast.error(message)
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
