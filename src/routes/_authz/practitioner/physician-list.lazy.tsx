import { createLazyFileRoute } from '@tanstack/react-router'
import PhysicianList from '@/resources/practitioner/pages/PhysicianList'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/practitioner/physician-list')(
    {
        component: RouteComponent,
    }
)

function RouteComponent() {
    return <PhysicianList />
}
