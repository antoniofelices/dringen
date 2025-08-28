import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import content from '@/config/data/pages/stadisticsUser'

const StadisticsUser = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>Some User Stadistics</ContentArticle>
            <ButtonBack />
        </>
    )
}

export default StadisticsUser
