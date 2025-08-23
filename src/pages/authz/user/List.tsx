import { useQuery } from '@tanstack/react-query'
import { useNavigate, Link } from '@tanstack/react-router'
import type { DataTableUser } from '@/types/interfaces'
import { getListUsers } from '@/services/supabaseService'
import { createUserColumns } from '@/config/Tables'
import { Button } from '@/components/ui/base/button'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import DataTable from '@/components/ui/DataTable'
import ErrorApi from '@components/ui/ErrorApi'
import Loading from '@components/ui/Loading'
import content from '@data/user/list'

const ListUser = () => {
    const {
        data: listData,
        isPending: listLoading,
        isError: listError,
        error: listErrorType,
    } = useQuery({
        queryKey: ['listUsers'],
        queryFn: () => getListUsers(),
    })

    const navigate = useNavigate()

    if (listLoading) return <Loading />

    if (listError && listErrorType)
        return <ErrorApi message={listErrorType.message} />

    return (
        <>
            <HeaderArticle title="List of health consumers">
                <Button asChild size="sm">
                    <Link to="/user/add">{content.textButtonAddNew}</Link>
                </Button>
            </HeaderArticle>
            <ContentArticle>
                <DataTable<DataTableUser>
                    columns={createUserColumns(navigate)}
                    data={listData || []}
                    caption={content.textCaptionTable}
                />
            </ContentArticle>
        </>
    )
}

export default ListUser
