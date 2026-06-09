import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { signInSchema } from '@auth/schemas/auth.schema'
import { signIn } from '@auth/services/auth.service'
import type { SignInFormType } from '@auth/types/auth.model'
import { contentES as content } from '@auth/components/SignInForm.content'
import { useProject } from '@auth/hooks/useProject'

export const useSignInForm = () => {
    const navigate = useNavigate()
    const { project } = useProject()

    const form = useForm<SignInFormType>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (formData: SignInFormType) => {
        try {
            await signIn(formData.email, formData.password, project?.id)
            navigate({ to: '/dashboard' })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : content.textToastFail
            toast.error(message)
        }
    }

    return { form, onSubmit }
}
