import 'react-big-calendar/lib/css/react-big-calendar.css'
import '@/styles/calendar.css'

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
import AddNewAppointmentForm from '@/resources/appointment/components/AddNewAppointmentForm'
import content from './CalendarSinglePhysician.content'

const CalendarSinglePhysician = ({ id }: { id: string }) => {
    return (
        <>
            <HeaderArticle title={content.title}>
                {/* <Button
                    size="sm"
                    onClick={() => addAppointmentDialog.openDialog()}
                >
                    {content.textButtonAdd}
                </Button> */}
            </HeaderArticle>
            <ContentArticle>
                <div className="h-[80vh] w-full">
                    <p>Calendario de UN Medico Singular.</p>
                    <p>Physician puede seleccionar Appointments.</p>
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

export default CalendarSinglePhysician
