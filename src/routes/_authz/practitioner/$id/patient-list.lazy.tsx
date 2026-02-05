import { createLazyFileRoute } from '@tanstack/react-router'
import PatientList from '@/resources/patient/pages/PatientList'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute(
    '/_authz/practitioner/$id/patient-list'
)({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams()
    return <PatientList id={id} />
}
