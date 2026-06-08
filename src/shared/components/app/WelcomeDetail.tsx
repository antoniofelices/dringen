import { Link } from '@tanstack/react-router'
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
                        <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                            {content.textIntro}
                        </p>
                        <h2 className="font-bold text-xl  md:text-2xl  lg:text-3xl  2xl:text-4xl text-gray-700 dark:text-gray-300">
                            {content.title} {user?.firstName}
                        </h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-8">
                        {content.textWelcome}
                    </p>
                    <Button size="sm">
                        <Link to="/patient/patient-list">
                            {content.accessPatients}
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}

export default WelcomeDetail
