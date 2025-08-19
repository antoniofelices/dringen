import { useQuery } from '@tanstack/react-query'
import { useNavigate, Link } from '@tanstack/react-router'
import type { DataTableHealthConsumer } from '@/types/interfaces'
import { getListHealthConsumer } from '@/services/supabaseService'
import { createHealthConsumerColumns } from '@/config/Tables'
import { Button } from '@/components/ui/base/button'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import DataTable from '@/components/ui/DataTable'
import ErrorApi from '@components/ui/ErrorApi'
import Loading from '@components/ui/Loading'
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
            <HeaderArticle title={content.title}>
                <Button asChild size="sm">
                    <Link to="/health-consumer/add">
                        {content.textButtonAddNew}
                    </Link>
                </Button>
            </HeaderArticle>
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
