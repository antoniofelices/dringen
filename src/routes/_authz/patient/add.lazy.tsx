import { createLazyFileRoute } from '@tanstack/react-router'
import AddPatient from '@pages/authz/AddPatient'
import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/patient/add')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <ProtectedRoute allowedRoles={['admin', 'physician', 'medical_office']}>
            <AddPatient />
        </ProtectedRoute>
    )
}
