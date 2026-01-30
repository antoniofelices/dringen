import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import ThemeProvider from '@/context/ThemeProvider'
import MainAuthz from '@/layouts/authz/Main'
import { SidebarProvider } from '@/components/ui/base/sidebar'
import Aside from '@/layouts/authz/Aside'

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
                <MainAuthz>
                    <Outlet />
                </MainAuthz>
            </SidebarProvider>
        </ThemeProvider>
    )
}
