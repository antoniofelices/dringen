import type { Table } from '@tanstack/react-table'
import { Label } from '@shared/components/ui/base/label'
import { Input } from '@shared/components/ui/base/input'

type DataTableFilterProps<TData> = {
    table: Table<TData>
    column: string
    placeholder: string
}

const DataTableFilter = <TData,>({
    table,
    column,
    placeholder,
}: DataTableFilterProps<TData>) => {
    return (
        <div className="flex items-center py-4">
            <Label className="sr-only">{placeholder}</Label>
            <Input
                placeholder={`${placeholder}…`}
                value={
                    (table.getColumn(column)?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                    table.getColumn(column)?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
        </div>
    )
}

export default DataTableFilter
