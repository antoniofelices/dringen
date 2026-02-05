// import { toast } from 'sonner'
import { Lock, LockKeyhole } from 'lucide-react'
import { useForm } from 'react-hook-form'
// import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import content from './ResetPasswordForm.content'
import { resetPasswordSchema } from '@resources/practitioner/schemas/resetPasswordSchema.schema'

type FormData = z.infer<typeof resetPasswordSchema>

const ResetPasswordForm = () => {
    const defaultValues = {
        password: '',
        confirmPassword: '',
    }
    // const navigate = useNavigate()

    const form = useForm<FormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = () => {
        return
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
