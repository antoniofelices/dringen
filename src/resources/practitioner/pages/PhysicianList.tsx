// import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
// import type { PractitionerType } from '../types/practitioner.model'
// import { practitionerTableColumns } from '../presentation/practitionerTable.columns'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
// import DataTable from '@shared/components/ui/DataTable'
// import ErrorApi from '@shared/components/ui/ErrorApi'
// import Loading from '@shared/components/ui/Loading'
import content from './PhysicianList.content'

const PhysicianList = () => {
    // const {
    //     data: listData,
    //     isPending: listLoading,
    //     isError: listError,
    //     error: listErrorType,
    // } = useQuery({
    //     queryKey: ['listUsers'],
    //     queryFn: () => getUsers(),
    // })

    // const navigate = useNavigate()

    // if (listLoading) return <Loading />

    // if (listError && listErrorType)
    //     return <ErrorApi message={listErrorType.message} />

    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <p>Una lista de todos los Physicians de una Organization.</p>
                <p>Tabla con:</p>
                <ul>
                    <li>Nombre</li>
                    <li>Especialidad</li>
                    <li>Dias de atencion</li>
                    <li>Horario de atencion</li>
                    <li>
                        <Link to="/practitioner/lorem">
                            Acceso a cada single Physician
                        </Link>
                    </li>
                </ul>
                {/* <DataTable<UserType>
                    columns={createUserColumns(navigate)}
                    data={listData || []}
                    caption={content.textCaptionTable}
                /> */}
            </ContentArticle>
        </>
    )
}

export default PhysicianList
