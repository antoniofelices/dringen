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
                    <span className="font-bold">{item.label}</span>:{' '}
                    {item.value || ''}
                </li>
            ))}
        </ul>
    )
}

export default DataDisplayList
