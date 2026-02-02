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
import patientMenu from '@resources/patient/content/patientMenu.content'
import practitionerMenu from '@resources/practitioner/content/practitionerMenu.content'
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
                    <SidebarGroupLabel>
                        {content.titlePatients}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <MenuItems content={patientMenu} />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator />

                <SidebarGroup>
                    <SidebarGroupLabel>{content.titleUsers}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <MenuItems content={practitionerMenu} />
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
