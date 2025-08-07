import { createLazyFileRoute } from '@tanstack/react-router'
import List from '@/pages/authz/health-consumer/List'

export const Route = createLazyFileRoute('/_authz/health-consumer/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return <List />
}
