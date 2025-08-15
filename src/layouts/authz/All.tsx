import { Outlet } from '@tanstack/react-router'
// import Header from '@layouts/authz/Header'
import MainAuthz from '@/layouts/authz/Main'
import { SidebarProvider } from '@/components/ui/base/sidebar'
import Aside from '@/layouts/authz/Aside'

const All = () => {
    return (
        <SidebarProvider>
            <Aside />
            {/* <Header /> */}
            <MainAuthz>
                <Outlet />
            </MainAuthz>
        </SidebarProvider>
    )
}

export default All
