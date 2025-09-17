import { useState, useCallback } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '@/styles/calendar.css'
import {
    calendarLocalizer,
    transformAppointmentsToEvents,
    formEventData,
} from '@/lib/calendarUtils'
import { useAppointments } from '@hooks/useAppointments'
import type { View, SlotInfo, Event } from 'react-big-calendar'
import { toast } from 'sonner'
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

const CalendarPatient = () => {
    const {
        appointments,
        isPending,
        isError,
        error,
        refetch,
        deleteAppointment,
    } = useAppointments()

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

    const handleDeletedEvent = async (event: Event) => {
        deleteAppointment.mutate(event.resource.id)
        setIsDialogEventOpen(false)
        toast.success(content.textToastSuccessDelete)
    }

    const handleFormSuccess = () => {
        setIsDialogAddFormOpen(false)
        setSelectedDate(null)
        refetch()
    }

    if (isPending) return <Loading />

    if (isError && error) return <ErrorApi message={error.message} />

    const allEvents = transformAppointmentsToEvents(appointments || [])

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
            value: selectedEvent ? formEventData(selectedEvent) : '',
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
                        localizer={calendarLocalizer}
                        startAccessor="start"
                        endAccessor="end"
                        views={['month', 'week', 'day']}
                        events={allEvents}
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
