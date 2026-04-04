import { useCurrentUser } from '@auth/hooks/useCurrentUser'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import content from './WelcomeDetails.content'

const WelcomeDetail = () => {
    const { user } = useCurrentUser()
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h1>
                            {content.title} {user?.firstName}
                        </h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{content.textWelcome}</p>
                </CardContent>
            </Card>
        </>
    )
}

export default WelcomeDetail
