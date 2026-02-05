import { createLazyFileRoute } from '@tanstack/react-router'
import ListPhysician from '@/resources/practitioner/pages/ListPhysician'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/practitioner/list-physician')(
    {
        component: RouteComponent,
    }
)

function RouteComponent() {
    return <ListPhysician />
}
