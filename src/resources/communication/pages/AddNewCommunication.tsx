import { Card, CardContent } from '@shared/components/ui/base/card'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import AddNewCommunicationForm from '@resources/communication/components/AddNewCommunicationForm'
import content from './AddNewCommunication.content'

const AddNewCommunication = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <Card>
                    <CardContent>
                        <AddNewCommunicationForm />
                    </CardContent>
                </Card>
            </ContentArticle>
        </>
    )
}

export default AddNewCommunication
