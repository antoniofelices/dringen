import DataTable from '@shared/components/ui/DataTable'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import type { AppointmentType } from '@resources/appointment/types/appointment.model'
import { useUpdateAppointmentStatus } from '@resources/appointment/hooks/useUpdateAppointmentStatus'
import appointmentByPractitionerTableColumns from '@resources/appointment/presentation/appointmentByPractitionerTable.columns'
import content from './AppointmentListByPractitioner.content'

const AppointmentListByPractitioner = ({
    practitionerId,
}: {
    practitionerId: string
}) => {
    const { updateStatus } = useUpdateAppointmentStatus()

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2 className="font-extrabold">{content.title}</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable<AppointmentType>
                        columns={appointmentByPractitionerTableColumns(
                            updateStatus
                        )}
                        data={[]}
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default AppointmentListByPractitioner
