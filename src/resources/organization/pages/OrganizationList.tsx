import { useNavigate } from '@tanstack/react-router'
import ContentArticle from '@shared/components/ui/ContentArticle'
import DataTable from '@shared/components/ui/DataTable'
import ErrorApi from '@shared/components/ui/ErrorApi'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import Loading from '@shared/components/ui/Loading'
import type { OrganizationType } from '@resources/organization/types/organization.model'
import { useOrganizations } from '@resources/organization/hooks/useOrganization'
import organizationTableColumns from '@resources/organization/presentation/organizationTable.columns'
import content from './OrganizationList.content'

const OrganizationList = () => {
    const { organizations, isPending, isError, error } = useOrganizations()
    const navigate = useNavigate()

    if (isPending) return <Loading />

    if (isError && error) return <ErrorApi message={error.message} />

    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <DataTable<OrganizationType>
                    columns={organizationTableColumns(navigate)}
                    data={organizations || []}
                    caption={content.textCaptionTable}
                    filterColumn="name"
                    filterPlaceholder={content.textFilterPlaceholder}
                />
            </ContentArticle>
        </>
    )
}

export default OrganizationList
