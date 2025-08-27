// TODO: deleted.
// This app will never have new users signing up. The registration process is always managed by an admin user.

import { useId } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, User } from 'lucide-react'

import content from '@/config/data/authn/signUpForm'
import { Button } from '@/components/ui/base/button'
import { Input } from '@/components/ui/base/input'
import { Label } from '@/components/ui/base/label'
import { registerUserOriginal } from '@/services/supabaseService'
import mapSupabaseError from '@/services/mapSupabaseErrors'

const signUpSchema = z
    .object({
        username: z
            .string()
            .min(3, content.errorUserNameTooShort)
            .max(20, content.errorUserNameTooLong)
            .regex(
                /^[a-zA-Z0-9_]+$/,
                content.errorUserNameDisallowedCharacters
            ),
        email: z
            .string()
            .email(content.errorEmailInvalid)
            .min(1, content.errorEmailRequired),
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

type FormData = z.infer<typeof signUpSchema>

const SignUpFormOriginal = () => {
    const userNameId = useId()
    const emailId = useId()
    const passwordId = useId()
    const confirmPasswordId = useId()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (data: FormData) => {
        const { error } = await registerUserOriginal(
            data.email,
            data.password,
            data.username
        )

        if (error) {
            const { field, message } = mapSupabaseError(error.message)
            setError(field, {
                type: 'server',
                message,
            })
            return
        }

        navigate({ to: '/check-email' })
    }

    return (
        <>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <Label
                        htmlFor={userNameId}
                        className="text-sm font-bold flex items-center gap-2 mb-1"
                    >
                        <User className="w-4 h-4" />
                        {content.labelUserName}
                    </Label>
                    <Input
                        id={userNameId}
                        type="text"
                        {...register('username')}
                        placeholder={content.labelUserName}
                    />
                    {errors.username && (
                        <span className="text-red text-sm mt-1">
                            {errors.username?.message}
                        </span>
                    )}
                </div>
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
                <div className="my-5">
                    <Label
                        htmlFor={confirmPasswordId}
                        className="text-sm font-bold flex items-center gap-2 mb-1"
                    >
                        <Lock className="w-4 h-4" />
                        {content.labelConfirmPassword}
                    </Label>
                    <Input
                        id={confirmPasswordId}
                        type="password"
                        {...register('confirmPassword')}
                        placeholder={content.labelConfirmPassword}
                    />
                    {errors.confirmPassword && (
                        <span className="text-red text-sm mt-1">
                            {errors.confirmPassword?.message}
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

export default SignUpFormOriginal
