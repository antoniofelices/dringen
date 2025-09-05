import { createLazyFileRoute } from '@tanstack/react-router'
import Unauthorized from '@pages/authz/Unauthorized'

export const Route = createLazyFileRoute('/_authz/unauthorized')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Unauthorized />
}
