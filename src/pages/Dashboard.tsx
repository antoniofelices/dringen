// import { useCurrentPractitioner } from '@resources/practitioner/hooks/useCurrentPractitioner'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import ContentArticle from '@shared/components/ui/ContentArticle'
// import Loading from '@shared/components/ui/Loading'
// import ErrorApi from '@shared/components/ui/ErrorApi'
import content from './Dashboard.content'

const Dashboard = () => {
    // const { user, isPending, isError, error } = useCurrentPractitioner()

    // if (isPending) return <Loading />
    // if (isError && error) return <ErrorApi message={error.message} />

    return (
        <ContentArticle>
            <div className="grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h1>
                                {content.title} {null} {null}
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
