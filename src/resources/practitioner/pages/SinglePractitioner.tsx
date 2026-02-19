import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import PractitionerDetails from '@resources/practitioner/components/PractitionerDetails/PractitionerDetails'
import content from './SinglePractitioner.content'

const SinglePractitioner = ({ id }: { id: string }) => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <PractitionerDetails practitionerId={id} />
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default SinglePractitioner
