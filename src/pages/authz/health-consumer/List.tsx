import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import Loading from '@components/ui/Loading'
import ErrorApi from '@components/ui/ErrorApi'
import HeaderArticle from '@/components/ui/HeaderArticle'
import ContentArticle from '@/components/ui/ContentArticle'

import { getListHealthConsumer } from '@/services/supabaseService'
import { createHealthConsumerColumns } from '@/config/tables'
import DataTable from '@/components/ui/DataTable'
import type { DataTableHealthConsumer } from '@/types/interfaces'
import content from '@data/authz/health-consumer/list'

const ListHealthConsumer = () => {
    const {
        data: listData,
        isPending: listLoading,
        isError: listError,
        error: listErrorType,
    } = useQuery({
        queryKey: ['listHealthConsumers'],
        queryFn: () => getListHealthConsumer(),
    })

    const navigate = useNavigate()

    if (listLoading) return <Loading />

    if (listError && listErrorType)
        return <ErrorApi message={listErrorType.message} />

    return (
        <>
            <HeaderArticle title="List of health consumers"></HeaderArticle>
            <ContentArticle>
                <DataTable<DataTableHealthConsumer>
                    columns={createHealthConsumerColumns(navigate)}
                    data={listData || []}
                    caption={content.textCaptionTable}
                />
            </ContentArticle>
        </>
    )
}

export default ListHealthConsumer
