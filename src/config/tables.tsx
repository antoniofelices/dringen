import type { ColumnDef } from '@tanstack/react-table'
import type { DataTableHealthConsumer } from '@/types/interfaces'
import type { NavigateFn } from '@tanstack/react-router'

export const createHealthConsumerColumns = (
    navigate: NavigateFn
): ColumnDef<DataTableHealthConsumer>[] => [
    {
        accessorKey: 'id',
        header: 'Editar',
        cell: ({ row }) => {
            const idj = row.original.id
            return (
                <button
                    onClick={() => navigate({ to: `/health-consumer/${idj}` })}
                >
                    Editar
                </button>
            )
        },
    },
    {
        accessorKey: 'user_name',
        header: 'Name',
    },
    {
        accessorKey: 'user_last_name',
        header: 'Last Name',
    },
    {
        accessorKey: 'dni',
        header: 'DNI',
    },
]
