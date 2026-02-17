import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import SignInForm from '@auth/components/SignInForm'
import content from './Index.content.ts'

const Index = () => {
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

export default Index
