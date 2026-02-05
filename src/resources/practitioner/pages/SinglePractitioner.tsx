// import { useQuery } from '@tanstack/react-query'
import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import PractitionerDetails from '@resources/practitioner/components/PractitionerDetails'
import AddActions from '@/components/user/AddActions'
import content from './SinglePractitioner.content'

const SinglePractitioner = ({ id }: { id: string }) => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <PractitionerDetails />
                <AddActions userId={userData.id} userEmail={userData.email} />
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default SinglePractitioner
