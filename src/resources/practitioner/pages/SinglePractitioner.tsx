// import { useQuery } from '@tanstack/react-query'
import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import PractitionerDetails from '@resources/practitioner/components/PractitionerDetails'
// import ActionsPractitioner from '@resources/practitioner/components/ActionsPractitioner'
import content from './SinglePractitioner.content'

const SinglePractitioner = ({ id }: { id: string }) => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <PractitionerDetails />
                {/* <ActionsPractitioner /> */}
                <p>Si es medico: Horario de atencion, Consultorio.</p>
                <p>Boton de reinicio de contraseña?</p>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default SinglePractitioner
