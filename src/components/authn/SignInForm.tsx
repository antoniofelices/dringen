import { useId } from 'react'
import { Mail, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithPassword } from '@/services/supabaseService'
import mapSupabaseError from '@/services/mapSupabaseErrors'
import { Button } from '@/components/ui/base/button'
import { Input } from '@/components/ui/base/input'
import { Label } from '@/components/ui/base/label'
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
    const emailId = useId()
    const passwordId = useId()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = async (data: FormData) => {
        const { error } = await signInWithPassword(data.email, data.password)

        if (error) {
            const { field, message } = mapSupabaseError(error.message)
            setError(field, {
                type: 'server',
                message,
            })
            return
        }

        navigate({ to: '/patient/list' })
    }

    return (
        <>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <Label
                        htmlFor={emailId}
                        className="text-sm font-bold flex items-center gap-2 mb-1"
                    >
                        <Mail className="w-4 h-4" />
                        {content.labelEmail}
                    </Label>
                    <Input
                        id={emailId}
                        type="email"
                        {...register('email')}
                        placeholder={content.labelEmail}
                    />
                    {errors.email && (
                        <span className="text-red text-sm mt-1">
                            {errors.email?.message}
                        </span>
                    )}
                </div>
                <div className="my-5">
                    <Label
                        htmlFor={passwordId}
                        className="text-sm font-bold flex items-center gap-2 mb-1"
                    >
                        <Lock className="w-4 h-4" />
                        {content.labelPassword}
                    </Label>
                    <Input
                        id={passwordId}
                        type="password"
                        {...register('password')}
                        placeholder={content.labelPassword}
                    />
                    {errors.password && (
                        <span className="text-red text-sm mt-1">
                            {errors.password?.message}
                        </span>
                    )}
                </div>
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

export default SignInForm
