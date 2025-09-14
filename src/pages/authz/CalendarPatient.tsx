import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getAppointments } from '@services/supabaseService'
import type { View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale/es'
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

    const {
        data: listData,
        isPending: listLoading,
        isError: listError,
        error: listErrorType,
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

    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <RegisterAppointmentForm />
                <div className="h-[10rem]"></div>
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
                    />
                </div>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default CalendarPatient
