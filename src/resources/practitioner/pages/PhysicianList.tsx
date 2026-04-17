import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import ContentArticle from '@shared/components/ui/ContentArticle'
import DataTable from '@shared/components/ui/DataTable'
import DataTableFilter from '@shared/components/ui/DataTableFilter'
import ErrorApi from '@shared/components/ui/ErrorApi'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import Loading from '@shared/components/ui/Loading'
import type { PhysicianType } from '@resources/practitioner/types/practitioner.model'
import { usePhysicians } from '@resources/practitioner/hooks/useGetPractitioner'
import practitionerTableColumns from '@resources/practitioner/presentation/practitionerTable.columns'
import content from './PhysicianList.content'

const PhysicianList = () => {
    const { physicians, isPending, isError, error } = usePhysicians()
    const [filterValue, setFilterValue] = useState('')
    const navigate = useNavigate()

    if (isPending) return <Loading />

    if (isError && error) return <ErrorApi message={error.message} />

    return (
        <>
            <HeaderArticle title={content.title}>
                <div className="flex gap-2">
                    <DataTableFilter
                        value={filterValue}
                        onChange={setFilterValue}
                        placeholder={content.textFilterPlaceholder}
                    />
                </div>
            </HeaderArticle>
            <ContentArticle>
                <DataTable<PhysicianType>
                    columns={practitionerTableColumns(navigate)}
                    data={physicians || []}
                    caption={content.textCaptionTable}
                    filterColumn="specialty"
                    filterValue={filterValue}
                />
            </ContentArticle>
        </>
    )
}

export default PhysicianList
