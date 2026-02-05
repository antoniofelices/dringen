import { Link } from '@tanstack/react-router'
import { ChevronUp, Circle, Home } from 'lucide-react'
// import { useCurrentPractitioner } from '@resources/practitioner/hooks/useCurrentUser'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@shared/components/ui/base/dropdown-menu'
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
    SidebarSeparator,
    SidebarRail,
} from '@shared/components/ui/base/sidebar'
import ButtonSignOut from '@shared/components/ui/ButtonSignOut'
import Logo from '@shared/components/ui/Logo'
import MenuItems from '@shared/components/ui/Menutems'
import {
    physicianMenuTitle,
    physicianMenu,
} from '@/resources/practitioner/content/physicianMenu.content'
import {
    administrativeTitleMenu,
    administrativeMenu,
} from '@/resources/practitioner/content/administrativeMenu.content'
import content from './AuthzAside.content'

const Aside = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Logo customClasses="ml-2" />
                <SidebarMenu className="mt-8">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to={'/dashboard'}>
                                <Home className="stroke-blue-600" />
                                {content.textHome}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{physicianMenuTitle}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <MenuItems content={physicianMenu} />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator />

                <SidebarGroup>
                    <SidebarGroupLabel>
                        {administrativeTitleMenu}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <MenuItems content={administrativeMenu} />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarSeparator />

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <Circle className="stroke-blue-600" />
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-56">
                                <DropdownMenuItem>
                                    <Link to={'/practitioner/settings'}>
                                        {content.titleSettings}
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ButtonSignOut asbutton={false} />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default Aside
