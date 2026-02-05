import { createLazyFileRoute } from '@tanstack/react-router'
import AddNewPractitioner from '@/resources/practitioner/pages/AddNewPractitioner'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/practitioner/add')({
    component: RouteComponent,
})

function RouteComponent() {
    return <AddNewPractitioner />
}
