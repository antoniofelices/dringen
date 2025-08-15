import { createLazyFileRoute } from '@tanstack/react-router'
import AddUser from '@/pages/authz/user/Add'

export const Route = createLazyFileRoute('/_authz/user/add')({
    component: RouteComponent,
})

function RouteComponent() {
    return <AddUser />
}
