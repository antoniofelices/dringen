import { createLazyFileRoute } from '@tanstack/react-router'
import AddNewPatient from '@/resources/patient/pages/AddNewPatient'
// import ProtectedRoute from '@shared/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/patient/add')({
    component: RouteComponent,
})

function RouteComponent() {
    return <AddNewPatient />
}
