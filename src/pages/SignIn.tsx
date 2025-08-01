import { useNavigate } from '@tanstack/react-router'
import FormAuth from '@/components/patterns/FormAuth'
import Logo from '@/components/base/Logo'
import contentForm from '@/config/data/formAuth'
import { signInWithPassword } from '@/services/supabaseService'
import { getUserData } from '@/helpers/formAuthUtils'
import { useFormErrors } from '@/hooks/useFormErrors'

const SignIn = () => {
    const navigate = useNavigate()
    const { errors, errorHandler, resetErrors } = useFormErrors()

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const client = getUserData(formData)
        await loginHandler(client)
    }

    const loginHandler = async ({
        email,
        password,
    }: {
        email: string
        password: string
    }) => {
        resetErrors()

        if (!email || !password) {
            errorHandler({ noEmailPassword: true })
            return
        }

        const { error } = await signInWithPassword(email, password)

        if (error) {
            errorHandler({
                isError: true,
                message: error.message,
            })
            return
        }

        navigate({ to: '/health-consumer/list' })
    }

    return (
        <div className="grid h-screen place-items-center">
            <div>
                <Logo />
                <h1 className="sr-only">Sign In</h1>
                <FormAuth
                    actionType="sign-in"
                    content={contentForm}
                    errors={errors}
                    onSubmit={submitHandler}
                />
            </div>
        </div>
    )
}

export default SignIn
