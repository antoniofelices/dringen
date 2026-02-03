import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import content from './Stadistics.content'

const StadisticsPatient = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <div className="grid lg:grid-cols-6 gap-6 place-content-between"></div>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default StadisticsPatient
