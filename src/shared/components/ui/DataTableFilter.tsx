import { Label } from '@shared/components/ui/base/label'
import { Input } from '@shared/components/ui/base/input'

type DataTableFilterProps = {
    value: string
    onChange: (value: string) => void
    placeholder: string
}

const DataTableFilter = ({
    value,
    onChange,
    placeholder,
}: DataTableFilterProps) => {
    return (
        <>
            <Label className="sr-only">{placeholder}</Label>
            <Input
                placeholder={`${placeholder}…`}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="max-w-sm"
            />
        </>
    )
}

export default DataTableFilter
