import { createLazyFileRoute } from '@tanstack/react-router'
import StatisticsPatient from '@/pages/authz/StatisticsPatient'
import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/patient/statistics')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <ProtectedRoute allowedRoles={['admin', 'physician']}>
            <StatisticsPatient />
        </ProtectedRoute>
    )
}
