import { createFileRoute } from '@tanstack/react-router'
import SinglePatient from '@/pages/authz/SinglePatient'

export const Route = createFileRoute('/_authz/patient/$id')({
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
