import { createLazyFileRoute } from '@tanstack/react-router'
import PatientList from '@/resources/patient/pages/PatientList'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/patient/patient-list')({
    component: RouteComponent,
})

function RouteComponent() {
    return <PatientList />
}
