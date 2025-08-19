import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import content from '@/config/data/authz/health-consumer/stadistics'

const StadisticsHealthConsumer = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>Some Health Consumer Stadistics</ContentArticle>
            <ButtonBack />
        </>
    )
}

export default StadisticsHealthConsumer
