import type { ColumnDef } from '@tanstack/react-table'
import type { NavigateFn } from '@tanstack/react-router'
import type { PractitionerType } from '@resources/practitioner/types/practitioner.model'
import { ArrowUpDown, ArrowRight } from 'lucide-react'
import content from './practitionerTable.content'

const practitionerTableColumns = (
    navigate: NavigateFn
): ColumnDef<PractitionerType>[] => [
    {
        accessorKey: 'firstName',
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="flex items-center gap-2">
                        {content.labelUserName}
                        <ArrowUpDown size="12" />
                    </span>
                </button>
            )
        },
    },
    {
        accessorKey: 'lastName',
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="flex items-center gap-2">
                        {content.labelUserLastName}
                        <ArrowUpDown size="12" />
                    </span>
                </button>
            )
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="flex items-center gap-2">
                        {content.labelEmail}
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
                <button onClick={() => navigate({ to: `/practitioner/${id}` })}>
                    <ArrowRight size="16" />
                </button>
            )
        },
    },
]

export default practitionerTableColumns
