import { createLazyFileRoute } from '@tanstack/react-router'
import StadisticsUser from '@pages/authz/StadisticsUser'
import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/user/stadistics')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <StadisticsUser />
        </ProtectedRoute>
    )
}
