// TODO: deleted.
// This app will never have new users signing up. The registration process is always managed by an admin user.

import { Link } from '@tanstack/react-router'
import SignUpFormOriginal from '@/components/authn/SignUpFormOriginal'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import content from '@/config/data/pages/signUp'

const SignUp = () => {
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <SignUpFormOriginal />
                <p className="text-xs mt-4 text-center">
                    {content.textToSignIn}{' '}
                    <Link to="/sign-in">{content.textButtonSignIn}</Link>
                </p>
            </CardContent>
        </Card>
    )
}

export default SignUp
