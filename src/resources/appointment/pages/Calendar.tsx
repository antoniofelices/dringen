// import { useState, useCallback } from 'react'
// import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '@/styles/calendar.css'
import { Link } from '@tanstack/react-router'
// import { toast } from 'sonner'
// import { useAppointments } from '@resources/appointment/hooks/useAppointment'
// import { useDialog } from '@shared/hooks/useDialog'
// import type { View, SlotInfo, Event } from 'react-big-calendar'
// import {
//     calendarLocalizer,
//     transformAppointmentsToEvents,
//     formEventData,
// } from '@resources/appointment/utils/calendarUtils'
import { Button } from '@shared/components/ui/base/button'
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogTitle,
} from '@shared/components/ui/base/dialog'
import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
// import ErrorApi from '@shared/components/ui/ErrorApi'
// import Loading from '@shared/components/ui/Loading'
// import DataDisplayList from '@shared/components/ui/DataDisplayList'
import AddNewAppointmentForm from '@/resources/appointment/components/AddNewAppointmentForm'
import content from './Calendar.content'

const CalendarPatient = () => {
    // const {
    //     appointments,
    //     isPending,
    //     isError,
    //     error,
    //     refetch,
    //     deleteAppointment,
    // } = useAppointments()

    // const [currentView, setCurrentView] = useState<View>('month')
    // const [currentDate, setCurrentDate] = useState(new Date())
    // const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    // const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

    // const addAppointmentDialog = useDialog()
    // const eventDialog = useDialog()

    // const handleSelectSlot = useCallback(
    //     (slotInfo: SlotInfo) => {
    //         setSelectedDate(slotInfo.start)
    //         addAppointmentDialog.openDialog()
    //     },
    //     [addAppointmentDialog]
    // )

    // const handleSelectEvent = useCallback(
    //     (event: Event) => {
    //         setSelectedEvent(event)
    //         eventDialog.openDialog()
    //     },
    //     [eventDialog]
    // )

    // const handleDeletedEvent = (event: Event) => {
    //     deleteAppointment.mutate(event.resource.id)
    //     eventDialog.closeDialog()
    //     toast.success(content.textToastSuccessDelete)
    // }

    // const handleFormSuccess = () => {
    //     addAppointmentDialog.closeDialog()
    //     setSelectedDate(null)
    //     refetch()
    // }

    // if (isPending) return <Loading />

    // if (isError && error) return <ErrorApi message={error.message} />

    // const allEvents = transformAppointmentsToEvents(appointments || [])

    // const dataItems = [
    //     {
    //         label: content.labelPatient,
    //         value: selectedEvent
    //             ? `${selectedEvent.resource?.medical_patient?.user_name}
    //                ${selectedEvent.resource?.medical_patient?.user_last_name}`
    //             : '',
    //     },
    //     {
    //         label: content.labelPhysician,
    //         value: selectedEvent
    //             ? `${selectedEvent.resource?.medical_user?.user_name} ${selectedEvent.resource?.medical_user?.user_last_name}`
    //             : '',
    //     },
    //     {
    //         label: content.labelSchedule,
    //         value: selectedEvent ? formEventData(selectedEvent) : '',
    //     },
    // ]

    return (
        <>
            <HeaderArticle title={content.title}>
                <Button asChild size="sm">
                    <Link to="/patient/add">{content.textButtonAdd}</Link>
                </Button>
            </HeaderArticle>
            <ContentArticle>
                <p>
                    Calendario por semanas con todas las citas de todos los
                    medicos de toda la Organizacion.
                </p>
                <p>No es demasiado? Puede ser un caos de Calendar 🤯</p>
                <div className="h-[80vh] w-full">
                    {/* <Calendar
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
                    /> */}
                </div>
            </ContentArticle>
            <ButtonBack />
            {/* <Dialog
                open={addAppointmentDialog.isOpen}
                onOpenChange={addAppointmentDialog.setIsOpen}
            >
                <DialogOverlay className="bg-black/60" />
                <DialogContent className="sm:max-w-sm dark:bg-black">
                    <DialogTitle className="mb-2">
                        {content.titleDialogAppointment}
                    </DialogTitle>
                    <AddNewAppointmentForm
                        onSuccess={handleFormSuccess}
                        initialDate={selectedDate}
                    />
                </DialogContent>
            </Dialog>
            <Dialog
                open={eventDialog.isOpen}
                onOpenChange={eventDialog.setIsOpen}
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
            </Dialog> */}
        </>
    )
}

export default CalendarPatient
