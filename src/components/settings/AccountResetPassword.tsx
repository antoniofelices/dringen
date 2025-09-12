import { toast } from 'sonner'
import { Lock, LockKeyhole } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordUser } from '@/services/supabaseService'
import mapSupabaseError from '@/services/mapSupabaseErrors'
import type { PostgrestError } from '@supabase/supabase-js'
import { useCurrentUser } from '@hooks/useCurrentUser'
import { Button } from '@components/ui/base/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import ErrorApi from '@components/ui/ErrorApi'
import { Form } from '@components/ui/base/form'
import FormFieldInput from '@/components/ui/FormFieldInput'
import Loading from '@components/ui/Loading'
import content from '@/config/data/settings/accountResetPassword'

const resetUserPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, content.errorPasswordTooShort)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).*$/,
                content.errorPasswordMustContain
            ),
        confirmPassword: z.string().min(1, content.errorConfirmPassword),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: content.errorPasswordNoMatch,
        path: ['confirmPassword'],
    })

type FormData = z.infer<typeof resetUserPasswordSchema>

const AccountResetPassword = () => {
    const { isPending, isError, error } = useCurrentUser()

    const defaultValues = {
        password: '',
    }

    const form = useForm<FormData>({
        resolver: zodResolver(resetUserPasswordSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = async (formData: FormData) => {
        try {
            const updatePassword = await resetPasswordUser(formData.password)
            toast.success(content.textToastSuccess)
            form.reset()
            return updatePassword
        } catch (error) {
            const postgrestError = error as PostgrestError
            const { field, message } = mapSupabaseError(postgrestError.message)

            if (field && field in formData) {
                form.setError('root', {
                    type: 'server',
                    message,
                })
            }

            toast.error(`${content.textToastFail}: ${message}`)
            return
        }
    }

    if (isPending) return <Loading />
    if (isError && error) return <ErrorApi message={error.message} />

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2>{content.title}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
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
                        <Button type="submit" className="mr-2">
                            {form.formState.isSubmitting
                                ? content.textButtonSending
                                : content.textButtonSend}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default AccountResetPassword
