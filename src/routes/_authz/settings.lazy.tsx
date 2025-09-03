import { createLazyFileRoute } from '@tanstack/react-router'
import Settings from '@pages/authz/Settings'
import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/settings')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <ProtectedRoute allowedRoles={['admin', 'physician', 'medical_office']}>
            <Settings />
        </ProtectedRoute>
    )
}
