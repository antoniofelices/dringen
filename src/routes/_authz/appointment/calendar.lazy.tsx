import { createLazyFileRoute } from '@tanstack/react-router'
import Calendar from '@resources/appointment/pages/Calendar'
// import ProtectedRoute from '@shared/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/appointment/calendar')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Calendar />
}
