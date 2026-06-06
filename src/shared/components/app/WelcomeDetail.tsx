import { useCurrentUser } from '@auth/hooks/useCurrentUser'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import { Button } from '@shared/components/ui/base/button'
import content from './WelcomeDetails.content'

const WelcomeDetail = () => {
    const { user } = useCurrentUser()
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <p>{content.textIntro}</p>
                        <h1>
                            {content.title} {user?.firstName}
                        </h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{content.textWelcome}</p>
                    <Button size="sm">{content.accessPatients}</Button>
                </CardContent>
            </Card>
        </>
    )
}

export default WelcomeDetail
