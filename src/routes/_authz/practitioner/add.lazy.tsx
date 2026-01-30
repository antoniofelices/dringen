import { createLazyFileRoute } from '@tanstack/react-router'
import AddUser from '@/pages/practitioner/AddUser'
import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/practitioner/add')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <AddUser />
        </ProtectedRoute>
    )
}
