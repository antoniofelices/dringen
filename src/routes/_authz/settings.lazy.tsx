import { createLazyFileRoute } from '@tanstack/react-router'
import Settings from '@pages/authz/Settings'

export const Route = createLazyFileRoute('/_authz/settings')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Settings />
}
