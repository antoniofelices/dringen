import type { ColumnDef } from '@tanstack/react-table'
import type { AppointmentType } from '@resources/appointment/types/appointment.model'
import { ArrowUpDown } from 'lucide-react'
import { transformTime } from '@shared/utils/utils'
import content from './appointmentByPractitionerTable.content'

const appointmentByPractitionerTableColumns = (): ColumnDef<AppointmentType>[] => [
    {
        id: 'hour',
        accessorKey: 'start',
        header: ({ column }) => (
            <button
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                <span className="flex items-center gap-2">
                    {content.labelHour}
                    <ArrowUpDown size="12" />
                </span>
            </button>
        ),
        cell: ({ row }) => transformTime(row.getValue('hour')),
    },
    {
        accessorKey: 'patientName',
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="flex items-center gap-2">
                        {content.labelPatientName}
                        <ArrowUpDown size="12" />
                    </span>
                </button>
            )
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <button
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                <span className="flex items-center gap-2">
                    {content.labelStatus}
                    <ArrowUpDown size="12" />
                </span>
            </button>
        ),
        cell: ({ row }) => row.original.status,
    },
]

export default appointmentByPractitionerTableColumns
