import { createLazyFileRoute } from '@tanstack/react-router'
import MyProfile from '@pages/authz/MyProfile'

export const Route = createLazyFileRoute('/_authz/my-profile')({
    component: RouteComponent,
})

function RouteComponent() {
    return <MyProfile />
}
