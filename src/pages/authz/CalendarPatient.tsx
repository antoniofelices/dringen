import { useState } from 'react'
// import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getAppointments } from '@services/supabaseService'
import type { View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { Button } from '@/components/ui/base/button'
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/base/dialog'
import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import ErrorApi from '@components/ui/ErrorApi'
import Loading from '@components/ui/Loading'
import RegisterAppointmentForm from '@components/patient/RegisterAppointmentForm'
import content from '@/config/data/pages/calendarPatient'

const locales = {
    'es-ES': es,
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const CalendarPatient = () => {
    const [currentView, setCurrentView] = useState<View>('month')
    const [currentDate, setCurrentDate] = useState(new Date())
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // const handleSelectSlot = useCallback(
    //     (slotInfo) => console.log(slotInfo),
    //     []
    // )
    // const handleSelectEvent = useCallback((event) => console.log(event), [])

    const {
        data: listData,
        isPending: listLoading,
        isError: listError,
        error: listErrorType,
        refetch: appointmentsRefetch,
    } = useQuery({
        queryKey: ['listAppointments'],
        queryFn: () => getAppointments(),
    })

    if (listLoading) return <Loading />

    if (listError && listErrorType)
        return <ErrorApi message={listErrorType.message} />

    const handleFormSuccess = () => {
        setIsDialogOpen(false)
        appointmentsRefetch()
    }

    const events = listData.map((appt) => ({
        title: `${appt.medical_patient.user_name} ${appt.medical_patient.user_last_name} - Dra. ${appt.medical_user.user_last_name}`,
        start: new Date(appt.appointment_date),
        end: new Date(new Date(appt.appointment_date).getTime() + 30 * 60000),
        resource: appt,
    }))

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <HeaderArticle title={content.title}>
                <DialogTrigger asChild>
                    <Button size="sm">{content.textButtonAdd}</Button>
                </DialogTrigger>
            </HeaderArticle>
            <ContentArticle>
                <DialogOverlay className="bg-black/60" />
                <DialogContent className="sm:max-w-sm dark:bg-black">
                    <DialogTitle className="sr-only">
                        {content.textButtonAdd}
                    </DialogTitle>
                    <RegisterAppointmentForm onSuccess={handleFormSuccess} />
                </DialogContent>
                <div className="h-[80vh] w-[70vw]">
                    <Calendar
                        localizer={localizer}
                        startAccessor="start"
                        endAccessor="end"
                        views={['month', 'week', 'day']}
                        events={events}
                        view={currentView}
                        onView={setCurrentView}
                        date={currentDate}
                        onNavigate={setCurrentDate}
                        // onSelectEvent={handleSelectEvent}
                        // onSelectSlot={handleSelectSlot}
                        selectable
                    />
                </div>
            </ContentArticle>
            <ButtonBack />
        </Dialog>
    )
}

export default CalendarPatient
