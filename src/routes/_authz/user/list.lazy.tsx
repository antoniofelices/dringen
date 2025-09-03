import { createLazyFileRoute } from '@tanstack/react-router'
import ListUser from '@/pages/authz/ListUser'
import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/user/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <ListUser />
        </ProtectedRoute>
    )
}
