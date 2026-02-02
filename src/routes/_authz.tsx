import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import ThemeProvider from '@shared/context/ThemeProvider'
import AuthzMain from '@/layouts/AuthzMain'
import { SidebarProvider } from '@shared/components/ui/base/sidebar'
import Aside from '@/layouts/AuthzAside'

export const Route = createFileRoute('/_authz')({
    // beforeLoad: async () => {
    //     const { data } = null
    //     if (!data.session) {
    //         throw redirect({ to: '/' })
    //     }
    // },
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
