import { useState } from 'react'
import DataTable from '@shared/components/ui/DataTable'
import ErrorApi from '@shared/components/ui/ErrorApi'
import Loading from '@shared/components/ui/Loading'
import { Button } from '@shared/components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@shared/components/ui/base/tabs'
import DrawerWrapper from '@/shared/components/ui/DrawerWrapper'
import AddNewAppointmentFormByPatient from '@resources/appointment/components/AddNewAppointmentFormByPatient'
import type { AppointmentType } from '@resources/appointment/types/appointment.model'
import { useAppointmentsByPatient } from '@resources/appointment/hooks/useAppointmentsByPatient'
import { useUpdateAppointmentStatus } from '@resources/appointment/hooks/useUpdateAppointmentStatus'
import { useToggleAppointmentCalled } from '@resources/appointment/hooks/useToggleAppointmentCalled'
import appointmentByPatientTableColumns from '@resources/appointment/presentation/appointmentByPatientTable.columns'
import { contentES as content } from './AppointmentListByPatient.content'

const AppointmentListByPatient = ({ patientId }: { patientId: string }) => {
    const { bookedAppointments, pastAppointments, isPending, isError, error } =
        useAppointmentsByPatient(patientId)
    const { updateStatus } = useUpdateAppointmentStatus()
    const { toggleCalled } = useToggleAppointmentCalled()
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)

    if (isPending) return <Loading />

    if (isError && error) return <ErrorApi message={error.message} />

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2 className="font-bold text-gray-700 dark:text-gray-300">{content.title}</h2>
                    </CardTitle>
                    <CardAction>
                        <Button
                            size="xs"
                            variant="outline"
                            onClick={() => setIsAddDrawerOpen(true)}
                        >
                            {content.textButtonAdd}
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="future">
                        <TabsList>
                            <TabsTrigger value="future">
                                {content.tabFuture}
                            </TabsTrigger>
                            <TabsTrigger value="past">
                                {content.tabPast}
                            </TabsTrigger>
                        </TabsList>
                        <div>
                            <TabsContent value="future">
                                <DataTable<AppointmentType>
                                    columns={appointmentByPatientTableColumns(
                                        updateStatus,
                                        toggleCalled
                                    )}
                                    data={bookedAppointments}
                                />
                            </TabsContent>
                            <TabsContent value="past">
                                <DataTable<AppointmentType>
                                    columns={appointmentByPatientTableColumns(
                                        updateStatus,
                                        toggleCalled
                                    )}
                                    data={pastAppointments}
                                />
                            </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
            <DrawerWrapper
                open={isAddDrawerOpen}
                onOpenChange={setIsAddDrawerOpen}
                title={content.textAddDrawerTitle}
                description={content.textAddDrawerDescription}
            >
                <AddNewAppointmentFormByPatient
                    patientId={patientId}
                    onSuccess={() => setIsAddDrawerOpen(false)}
                />
            </DrawerWrapper>
        </>
    )
}

export default AppointmentListByPatient
