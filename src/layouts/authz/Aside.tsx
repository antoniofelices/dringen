import { Link } from '@tanstack/react-router'
import { ChevronUp, Circle, Home } from 'lucide-react'
import { useCurrentUser } from '@hooks/useCurrentUser'
import { usePermissions } from '@/hooks/usePermissions'
import RoleGuard from '@components/RoleGuard'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@components/ui/base/dropdown-menu'
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
} from '@components/ui/base/sidebar'
import ButtonSignOut from '@components/ui/ButtonSignOut'
import Logo from '@components/ui/Logo'
import MenuItems from '@components/ui/Menutems'
import patientsMenu from '@/config/data/menus/patients'
import usersMenu from '@/config/data/menus/users'
import content from '@data/layouts/asideAuthz'

const Aside = () => {
    const { user } = useCurrentUser()
    const { canAccess } = usePermissions()

    const patientsMenuFiltered = patientsMenu.filter((item) => {
        if (item.id === 4) {
            return canAccess(['admin', 'physician'])
        }
        return true
    })

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
                <RoleGuard
                    allowedRoles={['admin', 'physician', 'medical_office']}
                >
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            {content.titlePatients}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <MenuItems content={patientsMenuFiltered} />
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarSeparator />
                </RoleGuard>
                <RoleGuard allowedRoles={['admin']}>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            {content.titleUsers}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <MenuItems content={usersMenu} />
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </RoleGuard>
            </SidebarContent>
            <SidebarSeparator />

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <Circle className="stroke-blue-600" />
                                    {user?.user_name}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-56">
                                <RoleGuard
                                    allowedRoles={[
                                        'admin',
                                        'physician',
                                        'medical_office',
                                    ]}
                                >
                                    <DropdownMenuItem>
                                        <Link to={'/settings'}>
                                            {content.titleSettings}
                                        </Link>
                                    </DropdownMenuItem>
                                </RoleGuard>
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
