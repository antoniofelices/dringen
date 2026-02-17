import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import AuthzMain from '@layouts/AuthzMain'
import Aside from '@layouts/AuthzAside'
import ThemeProvider from '@shared/context/ThemeProvider'
import { SidebarProvider } from '@shared/components/ui/base/sidebar'
import { medplum } from '@shared/fhir/medplum'

export const Route = createFileRoute('/_authz')({
    beforeLoad: async () => {
        if (!medplum.getActiveLogin()) {
            throw redirect({ to: '/' })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider>
                <Aside />
                <AuthzMain>
                    <Outlet />
                </AuthzMain>
            </SidebarProvider>
        </ThemeProvider>
    )
}
