import { Link } from '@tanstack/react-router'
import { ChevronUp, Circle, Home } from 'lucide-react'
import { useCurrentUser } from '@auth/hooks/useCurrentUser'
import { useAuthContext } from '@auth/hooks/useAuthContext'
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
    SidebarTrigger,
    SidebarSeparator,
    SidebarRail,
} from '@shared/components/ui/base/sidebar'
import Logo from '@shared/components/ui/Logo'
import MenuItems from '@shared/navigation/components/MenuItems'
import { sidebarMenu } from '@shared/navigation/content/sidebarMenu.content'
import ButtonSignOut from '@auth/components/ButtonSignOut'
import content from './AuthzAside.content'

const AuthzAside = () => {
    const { user } = useCurrentUser()
    const { role } = useAuthContext()
    const groups = sidebarMenu(user?.id ?? '')

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Logo customClasses="ml-2" />
                <SidebarMenu className="mt-8">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to={'/dashboard'}>
                                <Home className="stroke-green-700" />
                                {content.textHome}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator className="m-0" />
            <SidebarContent className="overflow-x-hidden">
                {groups.map((group, index) => {
                    const isVisible =
                        !group.allowedRoles ||
                        (role && group.allowedRoles.includes(role))
                    if (!isVisible) return null
                    return (
                        <div key={group.id}>
                            <SidebarGroup>
                                <SidebarGroupLabel>
                                    {group.title}
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <MenuItems content={group.items} />
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                            {index < groups.length - 1 && (
                                <SidebarSeparator className="m-0" />
                            )}
                        </div>
                    )
                })}
                <SidebarSeparator className="m-0" />
                <SidebarGroup>
                    <SidebarTrigger className="text-green-700" />
                </SidebarGroup>
            </SidebarContent>
            <SidebarSeparator className="m-0" />

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <Circle className="stroke-green-700" />
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
