import type { RoutesProps } from '@/types/interfaces'
import { Link } from '@tanstack/react-router'

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
                <li key={item.id} className={`${classesListElement}`}>
                    <Link to={`/${item.url}` as any}>{item.text}</Link>
                </li>
            ))}
        </>
    )
}

export default MenuItems
