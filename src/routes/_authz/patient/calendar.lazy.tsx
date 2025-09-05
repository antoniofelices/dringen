import { createLazyFileRoute } from '@tanstack/react-router'
import CalendarPatient from '@/pages/authz/CalendarPatient'
import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/patient/calendar')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <ProtectedRoute allowedRoles={['admin', 'physician', 'medical_office']}>
            <CalendarPatient />
        </ProtectedRoute>
    )
}
