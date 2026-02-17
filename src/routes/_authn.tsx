import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import AuthnMain from '@layouts/AuthnMain'
import { medplum } from '@shared/fhir/medplum'

export const Route = createFileRoute('/_authn')({
    beforeLoad: async () => {
        if (medplum.getActiveLogin()) {
            throw redirect({ to: '/dashboard' })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <AuthnMain>
            <Outlet />
        </AuthnMain>
    )
}
