import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import ErrorApi from '@shared/components/ui/ErrorApi'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import Loading from '@shared/components/ui/Loading'
import OrganizationDetails from '@resources/organization/components/OrganizationDetails'
import { useOrganization } from '@resources/organization/hooks/useOrganization'
import content from './SingleOrganization.content'

const SingleOrganization = ({ id }: { id: string }) => {
    const { organization, isPending, isError, error } = useOrganization(id)

    if (isPending) return <Loading />
    if (isError && error) return <ErrorApi message={error.message} />
    if (!organization) return null

    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <OrganizationDetails organization={organization} />
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default SingleOrganization
