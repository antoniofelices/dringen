import { createLazyFileRoute } from '@tanstack/react-router'
import MyProfileUser from '@pages/authz/user/MyProfileUser'

export const Route = createLazyFileRoute('/_authz/user/my-profile')({
    component: RouteComponent,
})

function RouteComponent() {
    return <MyProfileUser />
}
