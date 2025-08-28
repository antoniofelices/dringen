import { createLazyFileRoute } from '@tanstack/react-router'
import ListUser from '@/pages/authz/ListUser'

export const Route = createLazyFileRoute('/_authz/user/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ListUser />
}
