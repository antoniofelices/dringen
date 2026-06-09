import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@shared/components/ui/base/button'
import ContentArticle from '@shared/components/ui/ContentArticle'
import DataTable from '@shared/components/ui/DataTable'
import DataTableFilter from '@shared/components/ui/DataTableFilter'
import ErrorApi from '@shared/components/ui/ErrorApi'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import Loading from '@shared/components/ui/Loading'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@shared/components/ui/base/tabs'
import type { AppointmentType } from '@resources/appointment/types/appointment.model'
import { useAppointments } from '@resources/appointment/hooks/useAppointment'
import { useUpdateAppointmentStatus } from '@resources/appointment/hooks/useUpdateAppointmentStatus'
import { useToggleAppointmentCalled } from '@resources/appointment/hooks/useToggleAppointmentCalled'
import appointmentTableColumns from '@resources/appointment/presentation/appointmentTable.columns'
import { contentES as content } from './AppointmentList.content'

const AppointmentList = () => {
    const {
        todayAppointments,
        tomorrowAppointments,
        restAppointments,
        isPending,
        isError,
        error,
    } = useAppointments()
    const { updateStatus } = useUpdateAppointmentStatus()
    const { toggleCalled } = useToggleAppointmentCalled()
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
                        <Link to="/appointment/add">
                            {content.textButtonAdd}
                        </Link>
                    </Button>
                </div>
            </HeaderArticle>
            <ContentArticle>
                <Tabs aria-label="Appointments" defaultValue="today">
                    <TabsList>
                        <TabsTrigger value="today">
                            {content.textToday}
                        </TabsTrigger>
                        <TabsTrigger value="tomorrow">
                            {content.textTomorrow}
                        </TabsTrigger>
                        <TabsTrigger value="rest">
                            {content.textRest}
                        </TabsTrigger>
                    </TabsList>
                    <div>
                        <TabsContent value="today">
                            <DataTable<AppointmentType>
                                columns={appointmentTableColumns(
                                    updateStatus,
                                    toggleCalled,
                                    false
                                )}
                                data={todayAppointments}
                                caption={content.textCaptionTable}
                                filterColumn="patientName"
                                filterValue={filterValue}
                            />
                        </TabsContent>
                        <TabsContent value="tomorrow">
                            <DataTable<AppointmentType>
                                columns={appointmentTableColumns(
                                    updateStatus,
                                    toggleCalled,
                                    false
                                )}
                                data={tomorrowAppointments}
                                caption={content.textCaptionTable}
                                filterColumn="patientName"
                                filterValue={filterValue}
                            />
                        </TabsContent>
                        <TabsContent value="rest">
                            <DataTable<AppointmentType>
                                columns={appointmentTableColumns(
                                    updateStatus,
                                    toggleCalled
                                )}
                                data={restAppointments}
                                caption={content.textCaptionTable}
                                filterColumn="patientName"
                                filterValue={filterValue}
                            />
                        </TabsContent>
                    </div>
                </Tabs>
            </ContentArticle>
        </>
    )
}

export default AppointmentList
