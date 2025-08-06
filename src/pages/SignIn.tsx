import SignInForm from '@/components/patterns/SignInForm'
import Logo from '@/components/base/Logo'

const SignIn = () => {
    return (
        <div className="grid h-screen place-items-center">
            <div>
                <Logo />
                <h1 className="sr-only">Sign In</h1>
                <SignInForm />
            </div>
        </div>
    )
}

export default SignIn
