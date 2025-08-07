import Main from '@layouts/authn/Main'
import SignInForm from '@/components/authn/SignInForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import content from '@/config/data/authn/signIn'

const Index = () => {
    return (
        <Main>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{content.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <SignInForm />
                </CardContent>
            </Card>
        </Main>
    )
}

export default Index
