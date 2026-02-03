import { createLazyFileRoute } from '@tanstack/react-router'
import ListPractitioner from '@resources/practitioner/pages/List'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/practitioner/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ListPractitioner />
}
