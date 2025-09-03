import { createLazyFileRoute } from '@tanstack/react-router'
import AddUser from '@/pages/authz/AddUser'
import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/user/add')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <AddUser />
        </ProtectedRoute>
    )
}
