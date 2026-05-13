import RoleGuard from '@auth/components/RoleGuard'
import ContentArticle from '@shared/components/ui/ContentArticle'
import ErrorApi from '@shared/components/ui/ErrorApi'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import Loading from '@shared/components/ui/Loading'
import OrganizationDetails from '@resources/organization/components/OrganizationDetails/OrganizationDetails'
import { useOrganizationById } from '@resources/organization/hooks/useOrganizationById'
import content from './SingleOrganization.content'

const SingleOrganization = ({ id }: { id: string }) => {
    const { organization, isPending, isError, error } = useOrganizationById(id)

    if (isPending) return <Loading />
    if (isError && error) return <ErrorApi message={error.message} />
    if (!organization) return null

    return (
        <>
            <HeaderArticle title={content.title}>
                <div className="flex gap-2 items-center">
                    {organization.name}
                </div>
            </HeaderArticle>
            <ContentArticle>
                <div className="grid lg:grid-cols-6 gap-6 place-content-between">
                    <div className="col-span-3">
                        <OrganizationDetails organization={organization} />
                    </div>
                    <RoleGuard allowedRoles={['administrative_hr']}>
                        <div className="col-span-3">
                            <h2>
                                A single component to display a list of location
                            </h2>
                        </div>
                    </RoleGuard>
                </div>
            </ContentArticle>
        </>
    )
}

export default SingleOrganization
