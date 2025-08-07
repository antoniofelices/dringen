import { createLazyFileRoute } from '@tanstack/react-router'
import ListHealthConsumers from '@/pages/authz/health-consumer/ListHealthConsumers'

export const Route = createLazyFileRoute('/_authz/health-consumer/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ListHealthConsumers />
}
