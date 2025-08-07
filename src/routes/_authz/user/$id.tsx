import { createFileRoute } from '@tanstack/react-router'
import SingleUser from '@pages/authz/user/SingleUser'

export const Route = createFileRoute('/_authz/user/$id')({
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
