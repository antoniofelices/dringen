import { createLazyFileRoute } from '@tanstack/react-router'
import CommunicationList from '@resources/communication/pages/CommunicationList'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute(
    '/_authz/communication/communication-list'
)({
    component: RouteComponent,
})

function RouteComponent() {
    return <CommunicationList />
}
