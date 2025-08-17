import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import Loading from '@components/ui/Loading'
import ErrorApi from '@components/ui/ErrorApi'
import { getListUsers } from '@/services/supabaseService'
import { createUserColumns } from '@/config/tables'
import DataTable from '@/components/ui/DataTable'
import type { DataTableUser } from '@/types/interfaces'
import content from '@data/authz/user/list'

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
        <DataTable<DataTableUser>
            columns={createUserColumns(navigate)}
            data={listData || []}
            caption={content.textCaptionTable}
        />
    )
}

export default ListUser
