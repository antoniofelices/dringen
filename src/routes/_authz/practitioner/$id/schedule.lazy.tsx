import { createLazyFileRoute } from '@tanstack/react-router'
import CalendarSinglePhysician from '@/resources/appointment/pages/CalendarSinglePhysician'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/practitioner/$id/schedule')({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams()
    return <CalendarSinglePhysician id={id} />
}
