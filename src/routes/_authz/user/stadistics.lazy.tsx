import { createLazyFileRoute } from '@tanstack/react-router'
import StadisticsUser from '@pages/authz/StadisticsUser'

export const Route = createLazyFileRoute('/_authz/user/stadistics')({
    component: RouteComponent,
})

function RouteComponent() {
    return <StadisticsUser />
}
