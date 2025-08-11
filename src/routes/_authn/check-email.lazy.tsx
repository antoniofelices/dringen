import { createLazyFileRoute } from '@tanstack/react-router'
import CheckEmail from '@/pages/authn/CheckEmail'

export const Route = createLazyFileRoute('/_authn/check-email')({
    component: RouteComponent,
})

function RouteComponent() {
    return <CheckEmail />
}
