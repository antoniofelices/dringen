import { createFileRoute } from '@tanstack/react-router'
import SingleUser from '@/pages/authz/SingleUser'
import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createFileRoute('/_authz/user/$id')({
    component: RouteComponent,
    params: {
        parse: (params) => ({
            id: params.id,
        }),
    },
})

function RouteComponent() {
    const { id } = Route.useParams()
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <SingleUser id={id} />
        </ProtectedRoute>
    )
}
