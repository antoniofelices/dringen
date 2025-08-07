import SignUpForm from '@/components/authn/SignUpForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import content from '@/config/data/authn/signUp'

const SignUp = () => {
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
        </Card>
    )
}

export default SignUp
