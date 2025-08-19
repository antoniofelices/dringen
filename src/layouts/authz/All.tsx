import { Outlet } from '@tanstack/react-router'
import ThemeProvider from '@/context/ThemeProvider'
import MainAuthz from '@/layouts/authz/Main'
import { SidebarProvider } from '@/components/ui/base/sidebar'
import Aside from '@/layouts/authz/Aside'

const All = () => {
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

export default All
