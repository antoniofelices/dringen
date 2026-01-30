import { createFileRoute } from '@tanstack/react-router'
import SinglePractitioner from '@/pages/practitioner/SinglePractitioner'
import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createFileRoute('/_authz/practitioner/$id')({
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
            <SinglePractitioner id={id} />
        </ProtectedRoute>
    )
}
