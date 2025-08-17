import type { ColumnDef } from '@tanstack/react-table'
import type { DataTableHealthConsumer } from '@/types/interfaces'
import type { NavigateFn } from '@tanstack/react-router'
import { ArrowUpDown, SquarePen, Ellipsis } from 'lucide-react'

export const createHealthConsumerColumns = (
    navigate: NavigateFn
): ColumnDef<DataTableHealthConsumer>[] => [
    {
        accessorKey: 'user_name',
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="flex items-center gap-2">
                        Name
                        <ArrowUpDown size="12" />
                    </span>
                </button>
            )
        },
    },
    {
        accessorKey: 'user_last_name',
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="flex items-center gap-2">
                        Last Name
                        <ArrowUpDown size="12" />
                    </span>
                </button>
            )
        },
    },
    {
        accessorKey: 'dni',
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="flex items-center gap-2">
                        DNI
                        <ArrowUpDown size="12" />
                    </span>
                </button>
            )
        },
    },
    {
        accessorKey: 'id',
        header: 'Edit',
        cell: ({ row }) => {
            const id = row.original.id
            return (
                <button
                    onClick={() => navigate({ to: `/health-consumer/${id}` })}
                >
                    <Ellipsis size="16" />
                </button>
            )
        },
    },
]
