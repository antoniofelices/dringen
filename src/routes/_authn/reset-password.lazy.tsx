import { createLazyFileRoute } from '@tanstack/react-router'
import ResetPassword from '@resources/practitioner/pages/ResetPassword'

export const Route = createLazyFileRoute('/_authn/reset-password')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ResetPassword />
}
