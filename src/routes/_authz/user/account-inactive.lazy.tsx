import { createLazyFileRoute } from '@tanstack/react-router'
import AccountInactive from '@pages/authz/AccountInactive'

export const Route = createLazyFileRoute('/_authz/user/account-inactive')({
    component: RouteComponent,
})

function RouteComponent() {
    return <AccountInactive />
}
