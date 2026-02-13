import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import OrganizationDetails from '@resources/organization/components/OrganizationDetails'
import content from './SingleOrganization.content'

const SingleOrganization = ({ id }: { id: string }) => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <OrganizationDetails />
                <p>Una card con datos de la organizacion.</p>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default SingleOrganization
