import { createLazyFileRoute } from '@tanstack/react-router'
import ListPatient from '@/pages/authz/ListPatient'
import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/patient/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <ProtectedRoute allowedRoles={['admin', 'physician', 'medical_office']}>
            <ListPatient />
        </ProtectedRoute>
    )
}
