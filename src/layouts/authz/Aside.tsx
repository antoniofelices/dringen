import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarTrigger,
} from '@/components/ui/base/sidebar'

import MenuItems from '@/components/ui/Menutems'
import healthConsumers from '@/config/data/menus/healthConsumers'
import users from '@/config/data/menus/users'

const Aside = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Health Consumers</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <MenuItems content={healthConsumers} />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Users</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <MenuItems content={users} />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default Aside
