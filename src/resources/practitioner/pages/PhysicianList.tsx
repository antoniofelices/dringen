import { useNavigate } from '@tanstack/react-router'
import ContentArticle from '@shared/components/ui/ContentArticle'
import DataTable from '@shared/components/ui/DataTable'
import ErrorApi from '@shared/components/ui/ErrorApi'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import Loading from '@shared/components/ui/Loading'
import type { PhysicianType } from '@resources/practitioner/types/practitioner.model'
import { usePhysicians } from '@/resources/practitioner/hooks/useGetPractitioner'
import practitionerTableColumns from '@resources/practitioner/presentation/practitionerTable.columns'
import content from './PhysicianList.content'

const PhysicianList = () => {
    const { physicians, isPending, isError, error } = usePhysicians()
    const navigate = useNavigate()

    if (isPending) return <Loading />

    if (isError && error) return <ErrorApi message={error.message} />

    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <DataTable<PhysicianType>
                    columns={practitionerTableColumns(navigate)}
                    data={physicians || []}
                    caption={content.textCaptionTable}
                    filterColumn="specialty"
                    filterPlaceholder={content.textFilterPlaceholder}
                />
            </ContentArticle>
        </>
    )
}

export default PhysicianList
