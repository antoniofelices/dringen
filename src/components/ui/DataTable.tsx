import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table'

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/base/table'

import { Label } from '@components/ui/base/label'
import { Input } from '@/components/ui/base/input'
import content from '@data/ui/dataTable'

type DataTableProps<TData> = {
    columns: ColumnDef<TData>[]
    data: TData[]
    caption?: string
}

const DataTable = <TData,>({
    columns,
    data,
    caption,
}: DataTableProps<TData>) => {
    const initialPageIndex = 0
    const initialPageSize = 15

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        initialState: {
            pagination: {
                pageIndex: initialPageIndex,
                pageSize: initialPageSize,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    const paginationArray = table.getPageOptions()

    return (
        <>
            <div className="flex items-center py-4">
                <Label className="sr-only">{content.textFilterByDNI}</Label>
                <Input
                    placeholder={`${content.textFilterByDNI}…`}
                    value={
                        (table.getColumn('dni')?.getFilterValue() as string) ??
                        ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('dni')
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableCaption className="sr-only">{caption}</TableCaption>
                    <TableHeader className="bg-gray-200 dark:bg-gray-800">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="bg-white dark:bg-gray-950">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {content.textNoResult}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {paginationArray.length > 1 && (
                <div className="flex mt-4 text-sm">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft size="18" />
                    </button>
                    {paginationArray.map((page) => {
                        return (
                            <button
                                key={page}
                                onClick={() => table.setPageIndex(page)}
                                disabled={
                                    table.getState().pagination.pageIndex ===
                                    page
                                }
                                className="px-2"
                            >
                                {page + 1}
                            </button>
                        )
                    })}
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight size="18" />
                    </button>
                </div>
            )}
        </>
    )
}

export default DataTable
