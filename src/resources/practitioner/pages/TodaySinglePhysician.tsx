import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import content from './TodaySinglePhysician.content'

const TodaySinglePhysician = ({ id }: { id: string }) => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <p>Agenda del dia de Un Medico Singular.</p>
                <p>Varios metaboxes:</p>
                <ul>
                    <li>Agenda del dia</li>
                    <li>Notas</li>
                    <li>Recuerdos</li>
                </ul>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default TodaySinglePhysician
