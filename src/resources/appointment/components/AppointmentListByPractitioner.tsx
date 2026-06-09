import { useNavigate } from '@tanstack/react-router'
import DataTable from '@shared/components/ui/DataTable'
import ErrorApi from '@shared/components/ui/ErrorApi'
import Loading from '@shared/components/ui/Loading'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import type { AppointmentType } from '@resources/appointment/types/appointment.model'
import { useAppointmentsByPractitioner } from '@resources/appointment/hooks/useAppointmentsByPractitioner'
import appointmentByPractitionerTableColumns from '@resources/appointment/presentation/appointmentByPractitionerTable.columns'
import { contentES as content } from './AppointmentListByPractitioner.content'

const AppointmentListByPractitioner = ({
    practitionerId,
}: {
    practitionerId: string
}) => {
    const navigate = useNavigate()
    const { todayAppointments, isPending, isError, error } =
        useAppointmentsByPractitioner(practitionerId)

    if (isPending) return <Loading />

    if (isError && error) return <ErrorApi message={error.message} />

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2 className="font-bold text-gray-700 dark:text-gray-300">{content.title}</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable<AppointmentType>
                        columns={appointmentByPractitionerTableColumns(navigate)}
                        data={todayAppointments}
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default AppointmentListByPractitioner
