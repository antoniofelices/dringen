// import { useQuery } from '@tanstack/react-query'
import { useNavigate, Link } from '@tanstack/react-router'
// import type { PractitionerType } from '../types/practitioner.model'
// import { practitionerTableColumns } from '../presentation/practitionerTable.columns'
import { Button } from '@shared/components/ui/base/button'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
// import DataTable from '@shared/components/ui/DataTable'
// import ErrorApi from '@shared/components/ui/ErrorApi'
// import Loading from '@shared/components/ui/Loading'
import content from './List.content'

const ListPractitioner = () => {
    // const {
    //     data: listData,
    //     isPending: listLoading,
    //     isError: listError,
    //     error: listErrorType,
    // } = useQuery({
    //     queryKey: ['listUsers'],
    //     queryFn: () => getUsers(),
    // })

    const navigate = useNavigate()

    // if (listLoading) return <Loading />

    // if (listError && listErrorType)
    //     return <ErrorApi message={listErrorType.message} />

    return (
        <>
            <HeaderArticle title={content.title}>
                <Button asChild size="sm">
                    <Link to="/practitioner/add">
                        {content.textButtonAddNew}
                    </Link>
                </Button>
            </HeaderArticle>
            <ContentArticle>
                {/* <DataTable<UserType>
                    columns={createUserColumns(navigate)}
                    data={listData || []}
                    caption={content.textCaptionTable}
                /> */}
            </ContentArticle>
        </>
    )
}

export default ListPractitioner
