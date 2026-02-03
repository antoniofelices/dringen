import { createLazyFileRoute } from '@tanstack/react-router'
import Settings from '@resources/practitioner/pages/Settings'
// import ProtectedRoute from '@shared/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/practitioner/settings')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Settings />
}
