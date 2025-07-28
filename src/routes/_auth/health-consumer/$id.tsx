import { createFileRoute } from '@tanstack/react-router'
import SingleHealthConsumer from '@/pages/health-consumer/SingleHealthConsumer'

export const Route = createFileRoute('/_auth/health-consumer/$id')({
    component: RouteComponent,
    params: {
        parse: (params) => ({
            id: Number(params.id),
        }),
    },
})

function RouteComponent() {
    const { id } = Route.useParams()
    return <SingleHealthConsumer id={id} />
}
