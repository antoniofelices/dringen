import { createLazyFileRoute } from '@tanstack/react-router'
import Unauthorized from '@resources/practitioner/pages/Unauthorized'

export const Route = createLazyFileRoute('/_authz/unauthorized')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Unauthorized />
}
