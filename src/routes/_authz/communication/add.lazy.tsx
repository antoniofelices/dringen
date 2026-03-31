import { createLazyFileRoute } from '@tanstack/react-router'
import AddNewCommunication from '@/resources/communication/pages/AddNewCommunication'
// import ProtectedRoute from '@shared/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/communication/add')({
    component: RouteComponent,
})

function RouteComponent() {
    return <AddNewCommunication />
}
