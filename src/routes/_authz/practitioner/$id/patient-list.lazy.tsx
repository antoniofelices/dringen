import { createLazyFileRoute } from '@tanstack/react-router'
import PatientListSinglePhysician from '@resources/patient/pages/PatientListSinglePhysician'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute(
    '/_authz/practitioner/$id/patient-list'
)({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams()
    return <PatientListSinglePhysician id={id} />
}
