import { Link } from '@tanstack/react-router'
import { ChevronUp, Circle, Home } from 'lucide-react'
import { useCurrentUser } from '@auth/hooks/useCurrentUser'
import RoleGuard from '@auth/components/RoleGuard'
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
import Logo from '@shared/components/ui/Logo'
import MenuItems from '@shared/components/ui/Menutems'
import {
    physicianMenuTitle,
    physicianMenu,
} from '@resources/practitioner/content/physicianMenu.content'
import {
    administrativeTitleMenu,
    administrativeMenu,
} from '@resources/practitioner/content/administrativeMenu.content'
import {
    organizationMenuTitle,
    organizationMenu,
} from '@resources/organization/content/organizationMenu.content'
import ButtonSignOut from '@auth/components/ButtonSignOut'
import content from './AuthzAside.content'

const AuthzAside = () => {
    const { user } = useCurrentUser()

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
                <RoleGuard allowedRoles={['doctor']}>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            {physicianMenuTitle}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <MenuItems
                                    content={physicianMenu(user?.id ?? '')}
                                />
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarSeparator />
                </RoleGuard>
                <RoleGuard allowedRoles={['administrative']}>
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
                </RoleGuard>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        {organizationMenuTitle}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <MenuItems content={organizationMenu} />
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
                                    {user?.firstName}
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

export default AuthzAside
