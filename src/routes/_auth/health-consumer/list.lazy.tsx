import { createLazyFileRoute } from '@tanstack/react-router'
import ListHealthConsumers from '@/pages/health-consumer/ListHealthConsumers'

export const Route = createLazyFileRoute('/_auth/health-consumer/list')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <ListHealthConsumers />
        </>
    )
}
