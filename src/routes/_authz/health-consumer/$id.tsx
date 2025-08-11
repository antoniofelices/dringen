import { createFileRoute } from '@tanstack/react-router'
import Single from '@/pages/authz/health-consumer/Single'

export const Route = createFileRoute('/_authz/health-consumer/$id')({
    component: RouteComponent,
    params: {
        parse: (params) => ({
            id: params.id,
        }),
    },
})

function RouteComponent() {
    const { id } = Route.useParams()
    return <Single id={id} />
}
