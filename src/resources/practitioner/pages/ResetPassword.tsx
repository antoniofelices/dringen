import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import ResetPasswordForm from '@resources/practitioner/components/ResetPasswordForm'
import content from './ResetPassword.content'

const ResetPassword = () => {
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-xs pb-6">
                    {content.textDescription}
                </p>
                <ResetPasswordForm />
            </CardContent>
        </Card>
    )
}

export default ResetPassword
