import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@shared/components/ui/base/button'
import ContentArticle from '@shared/components/ui/ContentArticle'
import DataTable from '@shared/components/ui/DataTable'
import DataTableFilter from '@shared/components/ui/DataTableFilter'
import ErrorApi from '@shared/components/ui/ErrorApi'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import Loading from '@shared/components/ui/Loading'
import type { CommunicationType } from '@resources/communication/types/communication.model'
import { useCommunications } from '@resources/communication/hooks/useGetCommunication'
import communicationTableColumns from '@resources/communication/presentation/communicationTable.columns'
import { contentES as content } from './CommunicationList.content'

const CommunicationList = () => {
    const { communications, isPending, isError, error } = useCommunications()
    const [filterValue, setFilterValue] = useState('')

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
                    <Button asChild size="sm">
                        <Link to="/communication/add">
                            {content.textButtonAdd}
                        </Link>
                    </Button>
                </div>
            </HeaderArticle>
            <ContentArticle>
                <DataTable<CommunicationType>
                    columns={communicationTableColumns()}
                    data={communications || []}
                    caption={content.textCaptionTable}
                    filterColumn="title"
                    filterValue={filterValue}
                />
            </ContentArticle>
        </>
    )
}

export default CommunicationList
