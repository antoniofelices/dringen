import { Link } from '@tanstack/react-router'
import { ChevronUp, Home, Moon, Sun } from 'lucide-react'
import { useCurrentUser } from '@auth/hooks/useCurrentUser'
import { useAuthContext } from '@auth/hooks/useAuthContext'
import { useThemeContext } from '@shared/hooks/useThemeContext'
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
    const { theme, setTheme } = useThemeContext()
    const groups = sidebarMenu(user?.id ?? '')

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Logo customClasses="ml-2 max-w-25" />
                <SidebarMenu className="mt-4">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link
                                to={'/dashboard'}
                                activeProps={{ 'data-active': 'true' }}
                            >
                                <Home className="stroke-indigo-500 dark:stroke-indigo-300" />
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
            </SidebarContent>
            <SidebarSeparator className="m-0" />

            <SidebarFooter>
                <SidebarSeparator className="m-0" />
                <SidebarGroup className="inline-flex flex-row items-center gap-4 group-data-[collapsible=icon]:flex-col">
                    <SidebarTrigger
                        className="text-indigo-500 dark:text-indigo-300"
                        size="xs"
                    />
                    <button
                        onClick={() =>
                            setTheme(theme === 'dark' ? 'light' : 'dark')
                        }
                        className="text-sidebar-foreground hover:text-sidebar-accent-foreground"
                    >
                        {theme === 'dark' ? (
                            <Sun className="size-4" />
                        ) : (
                            <Moon className="size-4" />
                        )}
                    </button>
                </SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-400 text-white text-xs font-bold leading-none">
                                        {user?.firstName?.[0]?.toUpperCase()}
                                        {user?.lastName?.[0]?.toUpperCase()}
                                    </span>
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
