import { createLazyFileRoute } from '@tanstack/react-router'
import OrganizationList from '@/resources/organization/pages/OrganizationList'
// import ProtectedRoute from '@/components/ProtectedRoute'

export const Route = createLazyFileRoute(
    '/_authz/organization/organization-list'
)({
    component: RouteComponent,
})

function RouteComponent() {
    return <OrganizationList />
}
