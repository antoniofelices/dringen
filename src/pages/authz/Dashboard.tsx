import { useCurrentUser } from '@hooks/useCurrentUser'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import ContentArticle from '@components/ui/ContentArticle'
import Loading from '@components/ui/Loading'
import ErrorApi from '@components/ui/ErrorApi'
import content from '@/config/data/pages/dashboard'

const Dashboard = () => {
    const { user, isPending, isError, error } = useCurrentUser()

    if (isPending) return <Loading />
    if (isError && error) return <ErrorApi message={error.message} />

    return (
        <ContentArticle>
            <div className="grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h1>
                                {content.title} {user?.user_name}{' '}
                                {user?.user_last_name}
                            </h1>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{content.textWelcome}</p>
                    </CardContent>
                </Card>
            </div>
        </ContentArticle>
    )
}

export default Dashboard
