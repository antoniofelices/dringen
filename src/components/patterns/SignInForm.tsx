import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import content from '@/config/data/signInForm'
import { signInWithPassword } from '@/services/supabaseService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import mapSupabaseError from '@/services/mapSupabaseErrors'

const signInSchema = z.object({
    email: z
        .string()
        .min(1, content.errorEmailRequired)
        .email(content.errorEmailInvalid),
    password: z.string().min(6, content.errorPasswordTooShort),
})

type FormData = z.infer<typeof signInSchema>

const SignInForm = () => {
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

        navigate({ to: '/health-consumer/list' })
    }

    return (
        <>
            <form className="py-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 lg:justify-items-start">
                    <div className="relative w-full col-span-12 my-4">
                        <label className="sr-only">{content.labelEmail}</label>
                        <Input
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
                    <div className="relative w-full col-span-12 my-4">
                        <label className="sr-only">
                            {content.labelPassword}
                        </label>
                        <Input
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
                    <Button type="submit" className="w-full col-span-12 my-4">
                        {isSubmitting
                            ? content.textButtonSending
                            : content.textButtonSend}
                    </Button>
                </div>
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
