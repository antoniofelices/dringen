import type { ColumnDef } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
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
    })

    const paginationArray = table.getPageOptions()

    return (
        <>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableCaption className="sr-only">{caption}</TableCaption>
                    <TableHeader className="bg-gray-200">
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
                    <TableBody>
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
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {paginationArray.length > 0 && (
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
