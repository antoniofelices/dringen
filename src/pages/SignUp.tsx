import { useNavigate } from '@tanstack/react-router'
import FormAuth from '@/components/patterns/FormAuth'
import Logo from '@/components/base/Logo'
import contentForm from '@data/formAuth'
import { registerUser } from '@/services/supabaseService'
import { getUserData } from '@/helpers/formAuthUtils'
import { useFormErrors } from '@/hooks/useFormErrors'

const SignUp = () => {
    const navigate = useNavigate()
    const { errors, errorHandler, resetErrors } = useFormErrors()

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const client = getUserData(formData)
        await registerHandler(client)
    }

    const registerHandler = async ({
        email,
        password,
        username,
    }: {
        email: string
        password: string
        username: string
    }) => {
        resetErrors()

        if (!email || !password) {
            errorHandler({ noEmailPassword: true })
            return
        }

        const { error } = await registerUser(email, password, username)

        if (error) {
            if (error.message.includes('User already registered')) {
                errorHandler({ repeatEmail: true })
            } else {
                errorHandler({
                    isError: true,
                    message: error.message,
                })
            }
            return
        }

        navigate({ to: '/profile' })
    }

    return (
        <div className="grid h-screen place-items-center">
            <div>
                <Logo />
                <h1 className="sr-only">Sign Up</h1>
                <FormAuth
                    actionType="sign-up"
                    content={contentForm}
                    errors={errors}
                    onSubmit={submitHandler}
                />
            </div>
        </div>
    )
}

export default SignUp
