import { createLazyFileRoute } from '@tanstack/react-router'
import AddNewAppointment from '@resources/appointment/pages/AddNewAppointment'
// import ProtectedRoute from '@shared/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/appointment/add')({
    component: RouteComponent,
})

function RouteComponent() {
    return <AddNewAppointment />
}
