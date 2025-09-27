import Main from '@layouts/authn/Main'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import SignInForm from '@/components/authn/SignInForm'
import content from '@/config/data/pages/index'

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
