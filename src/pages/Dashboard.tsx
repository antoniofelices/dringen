import ContentArticle from '@shared/components/ui/ContentArticle'
import WelcomeDetail from '@shared/components/app/WelcomeDetail'
import CommunicationDetails from '@resources/communication/components/CommunicationDetails'

const Dashboard = () => {
    return (
        <ContentArticle>
            <div className="grid grid-cols-2 gap-6">
                <WelcomeDetail />
                <CommunicationDetails />
            </div>
        </ContentArticle>
    )
}

export default Dashboard
