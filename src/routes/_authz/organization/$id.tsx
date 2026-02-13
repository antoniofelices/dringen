import { createFileRoute } from '@tanstack/react-router'
import SinglePatient from '@resources/organization/pages/SingleOrganization'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createFileRoute('/_authz/organization/$id')({
    component: RouteComponent,
    params: {
        parse: (params) => ({
            id: params.id,
        }),
    },
})

function RouteComponent() {
    const { id } = Route.useParams()

    return <SinglePatient id={id} />
}
