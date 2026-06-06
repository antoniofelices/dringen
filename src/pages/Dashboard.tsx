import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import WelcomeDetail from '@shared/components/app/WelcomeDetail'
import CommunicationDetails from '@resources/communication/components/CommunicationDetails'
import content from './Dashboard.content'

const Dashboard = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <div className="grid grid-cols-2 gap-6">
                    <WelcomeDetail />
                    <CommunicationDetails />
                </div>
            </ContentArticle>
        </>
    )
}

export default Dashboard
