import { createLazyFileRoute } from '@tanstack/react-router'
import Dashboard from '@pages/authz/Dashboard'

export const Route = createLazyFileRoute('/_authz/dashboard')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Dashboard />
}
