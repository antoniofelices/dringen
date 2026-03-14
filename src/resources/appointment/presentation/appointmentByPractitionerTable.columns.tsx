import type { ColumnDef } from '@tanstack/react-table'
import type { AppointmentType } from '@resources/appointment/types/appointment.model'
import { ArrowUpDown } from 'lucide-react'
import { transformTime } from '@shared/utils/utils'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@shared/components/ui/base/select'
import { STATUS_OPTIONS } from '@resources/appointment/config/config'
import content from './appointmentByPractitionerTable.content'

const appointmentByPractitionerTableColumns = (
    onStatusChange: (appointmentId: string, newStatus: string) => void
): ColumnDef<AppointmentType>[] => [
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
        cell: ({ row }) => (
            <Select
                value={row.original.status}
                onValueChange={(value) =>
                    onStatusChange(row.original.id, value)
                }
            >
                <SelectTrigger size="sm" className="w-40">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        ),
    },
]

export default appointmentByPractitionerTableColumns
