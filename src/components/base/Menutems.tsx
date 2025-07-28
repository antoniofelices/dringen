import type { RoutesProps } from '@/types/interfaces'
import { Link } from '@tanstack/react-router'

const MenuItems = ({
    content,
    variant,
}: {
    content: RoutesProps[]
    variant?: string
}) => {
    const classesListElement =
        variant === 'inverse'
            ? 'px-4 py-3 lg:py-0'
            : 'border-t border-gray-500 px-4 py-6 lg:border-t-0 lg:py-0'

    const menuData = content.toSorted(
        (a, b) => (a.orderMenu ?? 0) - (b.orderMenu ?? 0)
    )

    return (
        <>
            {menuData.map((item) => (
                <li key={item.id} className={`font-bold ${classesListElement}`}>
                    <Link to={`/${item.url}` as any}>{item.text}</Link>
                </li>
            ))}
        </>
    )
}

export default MenuItems
