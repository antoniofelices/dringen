import { createFileRoute } from '@tanstack/react-router'
import SingleHealthConsumer from '@/pages/authz/health-consumer/SingleHealthConsumer'

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
    return <SingleHealthConsumer id={id} />
}
