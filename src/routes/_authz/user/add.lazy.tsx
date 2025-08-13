import { createLazyFileRoute } from '@tanstack/react-router'
import Add from '@/pages/authz/user/Add'

export const Route = createLazyFileRoute('/_authz/user/add')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Add />
}
