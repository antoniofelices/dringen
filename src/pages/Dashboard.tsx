import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import ContentArticle from '@shared/components/ui/ContentArticle'
import content from './Dashboard.content'

const Dashboard = () => {
    return (
        <ContentArticle>
            <div className="grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h1>
                                {content.title} A Name {null}
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
