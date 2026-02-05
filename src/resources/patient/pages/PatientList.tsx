// import { useQuery } from '@tanstack/react-query'
import { useNavigate, Link } from '@tanstack/react-router'
// import type { PatientType } from '../types/patient.model.ts'
// import { getPatients } from '@resources/patient/hooks/usePatients'
// import { patientTableColumns } from '../presentation/patientTable.columns'
import { Button } from '@shared/components/ui/base/button'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
// import DataTable from '@shared/components/ui/DataTable'
// import ErrorApi from '@shared/components/ui/ErrorApi'
// import Loading from '@shared/components/ui/Loading'
import content from './PatientList.content'

const PatientList = ({ id }: { id: string }) => {
    // const {
    //     data: listData,
    //     isPending: listLoading,
    //     isError: listError,
    //     error: listErrorType,
    // } = useQuery({
    //     queryKey: ['listPatients'],
    //     queryFn: () => getPatients(),
    // })

    const navigate = useNavigate()

    // if (listLoading) return <Loading />

    // if (listError && listErrorType)
    //     return <ErrorApi message={listErrorType.message} />

    return (
        <>
            <HeaderArticle title={content.title}>
                <Button asChild size="sm">
                    <Link to="/patient/add">{content.textButtonAddNew}</Link>
                </Button>
            </HeaderArticle>
            <ContentArticle>
                {/* <DataTable<PatientType>
                    columns={createPatientColumns(navigate)}
                    data={listData || []}
                    caption={content.textCaptionTable}
                /> */}
                <p>Lista de pacientes de UN Medico Singular.</p>
                <p>Tabla con:</p>
                <ul>
                    <li>Nombre</li>
                    <li>Apellido</li>
                    <li>DNI</li>
                    <li>Acceso a cada single Patient</li>
                </ul>
            </ContentArticle>
        </>
    )
}

export default PatientList
