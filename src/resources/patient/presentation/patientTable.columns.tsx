import type { ColumnDef } from '@tanstack/react-table'
import type { NavigateFn } from '@tanstack/react-router'
import type { PatientType } from '../types/patient.model'
import { ArrowUpDown, ArrowRight } from 'lucide-react'

const patientTableColumns = (
    navigate: NavigateFn
): ColumnDef<PatientType>[] => [
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
                <button onClick={() => navigate({ to: `/patient/${id}` })}>
                    <ArrowRight size="16" />
                </button>
            )
        },
    },
]

export default patientTableColumns
