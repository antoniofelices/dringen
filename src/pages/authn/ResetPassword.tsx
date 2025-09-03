import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import ResetPasswordForm from '@/components/authn/ResetPasswordForm'
import content from '@/config/data/pages/resetPassword'

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
