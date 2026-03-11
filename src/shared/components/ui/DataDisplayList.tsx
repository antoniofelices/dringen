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
                    <span>{item.label}</span>:
                    <span className="font-bold"> {item.value || ''}</span>
                </li>
            ))}
        </ul>
    )
}

export default DataDisplayList
