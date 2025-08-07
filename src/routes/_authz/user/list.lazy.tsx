import { createLazyFileRoute } from '@tanstack/react-router'
import ListUsers from '@/pages/authz/user/ListUsers'

export const Route = createLazyFileRoute('/_authz/user/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ListUsers />
}
