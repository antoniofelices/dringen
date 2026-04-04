import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import ContentArticle from '@shared/components/ui/ContentArticle'
import CommunicationDetails from '@resources/communication/components/CommunicationDetails'
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
            <div className="grid grid-cols-1 gap-6 mt-4">
                <CommunicationDetails />
            </div>
        </ContentArticle>
    )
}

export default Dashboard
