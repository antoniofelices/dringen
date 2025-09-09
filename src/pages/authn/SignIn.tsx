import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import SignInForm from '@/components/authn/SignInForm'
import content from '@/config/data/pages/signIn'

const SignIn = () => {
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <SignInForm />
            </CardContent>
        </Card>
    )
}

export default SignIn
