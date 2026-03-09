import { createLazyFileRoute } from '@tanstack/react-router'
import ScheduleSinglePhysician from '@/resources/practitioner/pages/ScheduleSinglePhysician'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/practitioner/$id/schedule')({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams()
    return <ScheduleSinglePhysician id={id} />
}
