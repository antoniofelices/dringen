import { useQuery } from '@tanstack/react-query'
import { useNavigate, Link } from '@tanstack/react-router'
import type { DataTablePatient } from '@/types/interfaces'
import { getListPatients } from '@/services/supabaseService'
import { createPatientColumns } from '@/config/Tables'
import { Button } from '@/components/ui/base/button'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import DataTable from '@/components/ui/DataTable'
import ErrorApi from '@components/ui/ErrorApi'
import Loading from '@components/ui/Loading'
import content from '@/config/data/pages/listUser'

const ListPatient = () => {
    const {
        data: listData,
        isPending: listLoading,
        isError: listError,
        error: listErrorType,
    } = useQuery({
        queryKey: ['listHealthConsumers'],
        queryFn: () => getListPatients(),
    })

    const navigate = useNavigate()

    if (listLoading) return <Loading />

    if (listError && listErrorType)
        return <ErrorApi message={listErrorType.message} />

    return (
        <>
            <HeaderArticle title={content.title}>
                <Button asChild size="sm">
                    <Link to="/patient/add">{content.textButtonAddNew}</Link>
                </Button>
            </HeaderArticle>
            <ContentArticle>
                <DataTable<DataTablePatient>
                    columns={createPatientColumns(navigate)}
                    data={listData || []}
                    caption={content.textCaptionTable}
                />
            </ContentArticle>
        </>
    )
}

export default ListPatient
