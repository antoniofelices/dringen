import { createLazyFileRoute } from '@tanstack/react-router'
import ListPatient from '@resources/patient/pages/List'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/patient/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ListPatient />
}
