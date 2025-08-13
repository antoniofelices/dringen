// TODO: deleted.
// This app will never have new users signing up. The registration process is always managed by an admin user.

import { createLazyFileRoute } from '@tanstack/react-router'
import CheckEmail from '@/pages/authn/CheckEmail'

export const Route = createLazyFileRoute('/_authn/check-email')({
    component: RouteComponent,
})

function RouteComponent() {
    return <CheckEmail />
}
