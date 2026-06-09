import { useState } from 'react'
import { useNavigate, Link } from '@tanstack/react-router'
import { Button } from '@shared/components/ui/base/button'
import ContentArticle from '@shared/components/ui/ContentArticle'
import DataTable from '@shared/components/ui/DataTable'
import DataTableFilter from '@shared/components/ui/DataTableFilter'
import ErrorApi from '@shared/components/ui/ErrorApi'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import Loading from '@shared/components/ui/Loading'
import type { PatientType } from '@resources/patient/types/patient.model.ts'
import { usePatientsByPractitioner } from '@resources/patient/hooks/useGetPatient'
import patientTableColumns from '@resources/patient/presentation/patientTable.columns'
import { contentES as content } from './PatientListSinglePhysician.content'

const PatientListSinglePhysician = ({ id }: { id: string }) => {
    const { patients, isPending, isError, error } =
        usePatientsByPractitioner(id)
    const navigate = useNavigate()
    const [filterValue, setFilterValue] = useState('')

    if (isPending) return <Loading />

    if (isError && error) return <ErrorApi message={error.message} />

    return (
        <>
            <HeaderArticle title={content.title}>
                <div className="flex gap-2">
                    <DataTableFilter
                        value={filterValue}
                        onChange={setFilterValue}
                        placeholder={content.textFilterPlaceholder}
                    />
                    <Button asChild size="sm">
                        <Link to="/patient/add">
                            {content.textButtonAddNew}
                        </Link>
                    </Button>
                </div>
            </HeaderArticle>
            <ContentArticle>
                <DataTable<PatientType>
                    columns={patientTableColumns(navigate)}
                    data={patients || []}
                    caption={content.textCaptionTable}
                    filterColumn="dni"
                    filterValue={filterValue}
                />
            </ContentArticle>
        </>
    )
}

export default PatientListSinglePhysician
