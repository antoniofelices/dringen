import { createLazyFileRoute } from '@tanstack/react-router'
import CalendarPatient from '@/pages/authz/CalendarPatient'

export const Route = createLazyFileRoute('/_authz/patient/calendar')({
    component: RouteComponent,
})

function RouteComponent() {
    return <CalendarPatient />
}
