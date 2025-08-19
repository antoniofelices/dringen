import { Link } from '@tanstack/react-router'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import SignInForm from '@/components/authn/SignInForm'
import content from '@/config/data/authn/signIn'

const SignIn = () => {
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <SignInForm />
                <p className="text-xs mt-4 text-center">
                    {content.textToSignUp}{' '}
                    <Link to="/sign-up">{content.textButtonSignUp}</Link>
                </p>
            </CardContent>
        </Card>
    )
}

export default SignIn
