import { createLazyFileRoute } from '@tanstack/react-router'
import ListHealthConsumer from '@/pages/authz/health-consumer/List'

export const Route = createLazyFileRoute('/_authz/health-consumer/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ListHealthConsumer />
}
