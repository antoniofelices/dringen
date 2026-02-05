import { createFileRoute } from '@tanstack/react-router'
import SinglePractitioner from '@resources/practitioner/pages/Single'
// import ProtectedRoute from '@shared/components/ProtectedRoute'

export const Route = createFileRoute('/_authz/practitioner/$id/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams()
    return <SinglePractitioner id={id} />
}
