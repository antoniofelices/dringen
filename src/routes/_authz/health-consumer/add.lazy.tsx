import { createLazyFileRoute } from '@tanstack/react-router'
import Add from '@pages/authz/health-consumer/Add'

export const Route = createLazyFileRoute('/_authz/health-consumer/add')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Add />
}
