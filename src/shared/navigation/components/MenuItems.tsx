import { Link } from '@tanstack/react-router'
import type { NavigationItem } from '@shared/navigation/types/navigation.model'
import { useAuthContext } from '@auth/hooks/useAuthContext'
import {
    SidebarMenuButton,
    SidebarMenuItem,
} from '@shared/components/ui/base/sidebar'

const MenuItems = ({
    content,
    variant,
}: {
    content: NavigationItem[]
    variant?: string
}) => {
    const { role } = useAuthContext()
    const classesListElement = variant === 'inverse' ? '' : ''

    const menuData = content
        .filter(
            (item) =>
                !item.allowedRoles || (role && item.allowedRoles.includes(role))
        )
        .toSorted((a, b) => (a.orderMenu ?? 0) - (b.orderMenu ?? 0))

    return (
        <>
            {menuData.map((item) => (
                <SidebarMenuItem
                    key={item.id}
                    className={`${classesListElement}`}
                >
                    <SidebarMenuButton asChild>
                        <Link to={item.url as any}>
                            {item.icon && (
                                <item.icon className="stroke-green-700" />
                            )}
                            {item.text}
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </>
    )
}

export default MenuItems
