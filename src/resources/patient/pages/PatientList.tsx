import { useNavigate, Link } from '@tanstack/react-router'
import { Button } from '@shared/components/ui/base/button'
import ContentArticle from '@shared/components/ui/ContentArticle'
import DataTable from '@shared/components/ui/DataTable'
import ErrorApi from '@shared/components/ui/ErrorApi'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import Loading from '@shared/components/ui/Loading'
import type { PatientType } from '@resources/patient/types/patient.model.ts'
import { usePatients } from '@/resources/patient/hooks/usePatient'
import patientTableColumns from '@resources/patient/presentation/patientTable.columns'
import content from './PatientList.content'

const PatientList = () => {
    const { patients, isPending, isError, error } = usePatients()
    const navigate = useNavigate()

    if (isPending) return <Loading />

    if (isError && error) return <ErrorApi message={error.message} />

    return (
        <>
            <HeaderArticle title={content.title}>
                <Button asChild size="sm">
                    <Link to="/patient/add">{content.textButtonAddNew}</Link>
                </Button>
            </HeaderArticle>
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

export default PatientList
