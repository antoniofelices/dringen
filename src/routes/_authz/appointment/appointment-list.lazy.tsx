import { createLazyFileRoute } from '@tanstack/react-router'
import AppointmentList from '@/resources/appointment/pages/AppointmentList'
// import ProtectedRoute from '@shared/components/ProtectedRoute'

export const Route = createLazyFileRoute(
    '/_authz/appointment/appointment-list'
)({
    component: RouteComponent,
})

function RouteComponent() {
    return <AppointmentList />
}
