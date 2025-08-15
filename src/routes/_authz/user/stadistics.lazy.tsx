import { createLazyFileRoute } from '@tanstack/react-router'
import StadisticsUser from '@pages/authz/user/Stadistics'

export const Route = createLazyFileRoute('/_authz/user/stadistics')({
    component: RouteComponent,
})

function RouteComponent() {
    return <StadisticsUser />
}
