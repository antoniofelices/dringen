import { createLazyFileRoute } from '@tanstack/react-router'
import ListUser from '@/pages/practitioner/ListUser'
import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute('/_authz/practitioner/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <ListUser />
        </ProtectedRoute>
    )
}
