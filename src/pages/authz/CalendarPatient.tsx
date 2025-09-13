import { useState } from 'react'
import type { View } from 'react-big-calendar'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale/es'
import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import { dummyEvents } from '@/data/dummyDataCalendar'
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

    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <div className="h-[80vh] w-[70vw]">
                    <Calendar
                        localizer={localizer}
                        startAccessor="start"
                        endAccessor="end"
                        views={['month', 'week', 'day']}
                        events={dummyEvents}
                        view={currentView}
                        onView={setCurrentView}
                        date={currentDate}
                        onNavigate={setCurrentDate}
                    />
                </div>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default CalendarPatient
