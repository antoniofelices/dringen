import { createLazyFileRoute } from '@tanstack/react-router'
import Unauthorized from '@pages/general/Unauthorized'

export const Route = createLazyFileRoute('/_authz/unauthorized')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Unauthorized />
}
