import { createLazyFileRoute } from '@tanstack/react-router'
import AddUser from '@/pages/authz/AddUser'

export const Route = createLazyFileRoute('/_authz/user/add')({
    component: RouteComponent,
})

function RouteComponent() {
    return <AddUser />
}
