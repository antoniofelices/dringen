import { Outlet, createFileRoute } from '@tanstack/react-router'
import Main from '@layouts/authn/Main'

export const Route = createFileRoute('/_authn')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Main>
            <Outlet />
        </Main>
    )
}
