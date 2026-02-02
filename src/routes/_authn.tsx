import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import AuthnMain from '@layouts/AuthnMain'

export const Route = createFileRoute('/_authn')({
    // beforeLoad: async () => {
    //     const { data } = null
    //     if (data.session) {
    //         throw redirect({ to: '/dashboard' })
    //     }
    // },
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <AuthnMain>
            <Outlet />
        </AuthnMain>
    )
}
