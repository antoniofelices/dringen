type DataItem = {
    label: string
    value: string | null | undefined
}

type DataDisplayListProps = {
    items: DataItem[]
    className?: string
}

const DataDisplayList = ({ items, className = '' }: DataDisplayListProps) => {
    return (
        <ul className={className}>
            {items.map((item, index) => (
                <li key={index} className="my-2">
                    <span className="block text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
                        {item.label}
                    </span>
                    <span className="font-bold text-sm text-gray-700 dark:text-gray-300">
                        {item.value || ''}
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default DataDisplayList
