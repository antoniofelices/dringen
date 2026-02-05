import { createLazyFileRoute } from '@tanstack/react-router'
import TodaySinglePhysician from '@/resources/practitioner/pages/TodaySinglePhysician'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/practitioner/$id/today')({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams()
    return <TodaySinglePhysician id={id} />
}
