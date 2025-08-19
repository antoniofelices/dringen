import { Link } from '@tanstack/react-router'
import { Home, Settings } from 'lucide-react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    // SidebarTrigger,
    SidebarSeparator,
    SidebarRail,
} from '@/components/ui/base/sidebar'
import Logo from '@/components/ui/Logo'
import MenuItems from '@/components/ui/Menutems'
import healthConsumers from '@/config/data/menus/healthConsumers'
import users from '@/config/data/menus/users'

const Aside = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                {/* <SidebarTrigger /> */}
                <Logo customClasses="ml-2" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to={'/dashboard'}>
                                <Home />
                                Home
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
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
                <SidebarSeparator />
                <SidebarGroup>
                    <SidebarGroupLabel>Users</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <MenuItems content={users} />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarSeparator />

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to={'/settings'}>
                                <Settings />
                                Settings
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default Aside
