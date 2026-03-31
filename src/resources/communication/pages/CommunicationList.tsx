import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import content from './CommunicationList.content'

const CommunicationList = () => {
    return (
        <>
            <HeaderArticle title={content.title}>
                <div className="flex gap-2"></div>
            </HeaderArticle>
            <ContentArticle>'A list of Communications'</ContentArticle>
        </>
    )
}

export default CommunicationList
