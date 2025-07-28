import { createLazyFileRoute } from '@tanstack/react-router'
import ProfileUser from '@pages/user/SingleUser'

export const Route = createLazyFileRoute('/_auth/user/profile')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ProfileUser />
}
