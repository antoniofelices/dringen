import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import AuthProvider from '@auth/context/AuthProvider'
import AuthzMain from '@layouts/AuthzMain'
import AuthzAside from '@layouts/AuthzAside'
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
        <AuthProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <SidebarProvider>
                    <AuthzAside />
                    <AuthzMain>
                        <Outlet />
                    </AuthzMain>
                </SidebarProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}
