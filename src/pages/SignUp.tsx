import SignUpForm from '@/components/patterns/SignUpForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import content from '@/config/data/pages/signUp'

const SignUp = () => {
    return (
        <div className="grid min-h-screen place-items-center">
            <div className="w-full max-w-md mx-auto p-4">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">
                            {content.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SignUpForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SignUp
