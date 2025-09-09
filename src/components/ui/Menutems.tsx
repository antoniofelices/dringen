import { Link } from '@tanstack/react-router'
import type { RoutesProps } from '@/types/interfaces'
import {
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/base/sidebar'

const MenuItems = ({
    content,
    variant,
}: {
    content: RoutesProps[]
    variant?: string
}) => {
    const classesListElement = variant === 'inverse' ? '' : ''

    const menuData = content.toSorted(
        (a, b) => (a.orderMenu ?? 0) - (b.orderMenu ?? 0)
    )

    return (
        <>
            {menuData.map((item) => (
                <SidebarMenuItem
                    key={item.id}
                    className={`${classesListElement}`}
                >
                    <SidebarMenuButton asChild>
                        <Link to={`/${item.url}` as any}>
                            {item.icon && (
                                <item.icon className="stroke-blue-600" />
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
