import { useNavigate } from '@tanstack/react-router'
import ContentArticle from '@shared/components/ui/ContentArticle'
import DataTable from '@shared/components/ui/DataTable'
import ErrorApi from '@shared/components/ui/ErrorApi'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import Loading from '@shared/components/ui/Loading'
import type { PatientType } from '@resources/patient/types/patient.model.ts'
import { usePatientsByPractitioner } from '@resources/patient/hooks/useGetPatient'
import patientTableColumns from '@resources/patient/presentation/patientTable.columns'
import content from './PatientListSinglePhysician.content'

const PatientListSinglePhysician = ({ id }: { id: string }) => {
    const { patients, isPending, isError, error } =
        usePatientsByPractitioner(id)
    const navigate = useNavigate()

    if (isPending) return <Loading />

    if (isError && error) return <ErrorApi message={error.message} />

    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <DataTable<PatientType>
                    columns={patientTableColumns(navigate)}
                    data={patients || []}
                    caption={content.textCaptionTable}
                    filterColumn="dni"
                    filterPlaceholder={content.textFilterPlaceholder}
                />
            </ContentArticle>
        </>
    )
}

export default PatientListSinglePhysician
