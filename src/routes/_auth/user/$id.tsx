import { createFileRoute } from '@tanstack/react-router'
import SingleUser from '@pages/user/SingleUser'

export const Route = createFileRoute('/_auth/user/$id')({
    component: RouteComponent,
    params: {
        parse: (params) => ({
            id: Number(params.id),
        }),
    },
})

function RouteComponent() {
    const { id } = Route.useParams()
    return <SingleUser id={id} />
}
