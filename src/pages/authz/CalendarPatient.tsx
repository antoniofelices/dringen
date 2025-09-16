import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '@/styles/calendar.css'
import { getAppointments, deleteAppointment } from '@services/supabaseService'
import type { View, SlotInfo, Event } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { toast } from 'sonner'
import { es } from 'date-fns/locale/es'
import { Button } from '@/components/ui/base/button'
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogTitle,
} from '@/components/ui/base/dialog'
import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import ErrorApi from '@components/ui/ErrorApi'
import Loading from '@components/ui/Loading'
import DataDisplayList from '@components/ui/DataDisplayList'
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
    const [isDialogAddFormOpen, setIsDialogAddFormOpen] = useState(false)
    const [isDialogEventOpen, setIsDialogEventOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

    const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
        setSelectedDate(slotInfo.start)
        setIsDialogAddFormOpen(true)
    }, [])

    const handleSelectEvent = useCallback((event: Event) => {
        setSelectedEvent(event)
        setIsDialogEventOpen(true)
    }, [])

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

    const events = listData.map((appt) => ({
        title: `${appt.medical_patient.user_name} ${appt.medical_patient.user_last_name} - Dra. ${appt.medical_user.user_last_name}`,
        start: new Date(appt.appointment_date),
        end: new Date(new Date(appt.appointment_date).getTime() + 30 * 60000),
        resource: appt,
    }))

    const handleFormSuccess = () => {
        setIsDialogAddFormOpen(false)
        setSelectedDate(null)
        appointmentsRefetch()
    }

    const handleDeletedEvent = async (event: Event) => {
        await deleteAppointment(event.resource.id)
        setIsDialogEventOpen(false)
        toast.success(content.textToastSuccessDelete)
        appointmentsRefetch()
    }

    const dataItems = [
        {
            label: content.labelPatient,
            value: selectedEvent
                ? `${selectedEvent.resource?.medical_patient?.user_name}
                   ${selectedEvent.resource?.medical_patient?.user_last_name}`
                : '',
        },
        {
            label: content.labelPhysician,
            value: selectedEvent
                ? `${selectedEvent.resource?.medical_user?.user_name} ${selectedEvent.resource?.medical_user?.user_last_name}`
                : '',
        },
        {
            label: content.labelSchedule,
            value: selectedEvent
                ? format(selectedEvent.start!, 'dd/MM/yyyy - HH:mm', {
                      locale: es,
                  })
                : '',
        },
    ]

    return (
        <>
            <HeaderArticle title={content.title}>
                <Button size="sm" onClick={() => setIsDialogAddFormOpen(true)}>
                    {content.textButtonAdd}
                </Button>
            </HeaderArticle>
            <ContentArticle>
                <div className="h-[80vh] w-full">
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
                        onSelectEvent={handleSelectEvent}
                        onSelectSlot={handleSelectSlot}
                        selectable
                    />
                </div>
            </ContentArticle>
            <ButtonBack />
            <Dialog
                open={isDialogAddFormOpen}
                onOpenChange={setIsDialogAddFormOpen}
            >
                <DialogOverlay className="bg-black/60" />
                <DialogContent className="sm:max-w-sm dark:bg-black">
                    <DialogTitle className="mb-2">
                        {content.titleDialogAppointment}
                    </DialogTitle>
                    <RegisterAppointmentForm
                        onSuccess={handleFormSuccess}
                        initialDate={selectedDate}
                    />
                </DialogContent>
            </Dialog>
            <Dialog
                open={isDialogEventOpen}
                onOpenChange={setIsDialogEventOpen}
            >
                <DialogOverlay className="bg-black/60" />
                <DialogContent className="sm:max-w-sm dark:bg-black">
                    <DialogTitle>{content.titleDialogEvent}</DialogTitle>
                    {selectedEvent && (
                        <>
                            <DataDisplayList items={dataItems} />
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                    handleDeletedEvent(selectedEvent)
                                }
                            >
                                {content.textButtonDeleteEvent}
                            </Button>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CalendarPatient
