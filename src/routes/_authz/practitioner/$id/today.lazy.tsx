import { createLazyFileRoute } from '@tanstack/react-router'
import TodayPhysician from '@/resources/practitioner/pages/TodayPhysician'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/practitioner/$id/today')({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams()
    return <TodayPhysician id={id} />
}
