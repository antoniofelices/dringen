import { Link } from '@tanstack/react-router'
import SignUpForm from '@/components/authn/SignUpForm'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import content from '@/config/data/authn/signUp'

const SignUp = () => {
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <SignUpForm />
                <p className="text-xs mt-4 text-center">
                    {content.textToSignIn}{' '}
                    <Link to="/sign-in">{content.textButtonSignIn}</Link>
                </p>
            </CardContent>
        </Card>
    )
}

export default SignUp
