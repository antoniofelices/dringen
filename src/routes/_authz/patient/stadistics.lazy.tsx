import { createLazyFileRoute } from '@tanstack/react-router'
import StadisticsPatient from '@/pages/authz/StadisticsPatient'
import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/patient/stadistics')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <ProtectedRoute allowedRoles={['admin', 'physician', 'medical_office']}>
            <StadisticsPatient />
        </ProtectedRoute>
    )
}
