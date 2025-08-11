import { createLazyFileRoute } from '@tanstack/react-router'
import Stadistics from '@/pages/authz/health-consumer/Stadistics'

export const Route = createLazyFileRoute('/_authz/health-consumer/stadistics')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Stadistics />
}
