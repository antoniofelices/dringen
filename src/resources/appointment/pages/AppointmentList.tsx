import { Link } from '@tanstack/react-router'
import { Button } from '@shared/components/ui/base/button'
import ContentArticle from '@shared/components/ui/ContentArticle'
import DataTable from '@shared/components/ui/DataTable'
import ErrorApi from '@shared/components/ui/ErrorApi'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import Loading from '@shared/components/ui/Loading'
import type { AppointmentType } from '@resources/appointment/types/appointment.model'
import { useAppointments } from '@resources/appointment/hooks/useAppointment'
import { useUpdateAppointmentStatus } from '@resources/appointment/hooks/useUpdateAppointmentStatus'
import appointmentTableColumns from '@resources/appointment/presentation/appointmentTable.columns'
import content from './AppointmentList.content'

const AppointmentList = () => {
    const { appointments, isPending, isError, error } = useAppointments()
    const { updateStatus } = useUpdateAppointmentStatus()

    if (isPending) return <Loading />

    if (isError && error) return <ErrorApi message={error.message} />

    return (
        <>
            <HeaderArticle title={content.title}>
                <Button asChild size="sm">
                    <Link to="/patient/add">{content.textButtonAdd}</Link>
                </Button>
            </HeaderArticle>
            <ContentArticle>
                <DataTable<AppointmentType>
                    columns={appointmentTableColumns(updateStatus)}
                    data={appointments || []}
                    caption={content.textCaptionTable}
                    filterColumn="patientName"
                    filterPlaceholder={content.textFilterPlaceholder}
                />
            </ContentArticle>
        </>
    )
}

export default AppointmentList
