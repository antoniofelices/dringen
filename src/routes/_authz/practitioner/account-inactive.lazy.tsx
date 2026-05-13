import { createLazyFileRoute } from '@tanstack/react-router'
import AccountInactive from '@resources/practitioner/pages/AccountInactive'

export const Route = createLazyFileRoute(
    '/_authz/practitioner/account-inactive'
)({
    component: RouteComponent,
})

function RouteComponent() {
    return <AccountInactive />
}
