import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import content from '@/config/data/authz/health-consumer/add'

const AddHealthConsumer = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>A form to add new Healt Consumer</ContentArticle>
            <ButtonBack />
        </>
    )
}

export default AddHealthConsumer
