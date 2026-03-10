import type { ColumnDef } from '@tanstack/react-table'
import type { AppointmentType } from '@resources/appointment/types/appointment.model'
import { ArrowUpDown } from 'lucide-react'
import { transformDateTime } from '@shared/utils/utils'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@shared/components/ui/base/select'
import { STATUS_OPTIONS } from '@resources/appointment/config/config'
import content from './appointmentTable.content'

const appointmentTableColumns = (
    onStatusChange: (appointmentId: string, newStatus: string) => void
): ColumnDef<AppointmentType>[] => [
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
        accessorKey: 'patientPhone',
        header: () => {
            return (
                <span className="flex items-center gap-2">
                    {content.labelPatientPhone}
                </span>
            )
        },
    },
    {
        accessorKey: 'practitionerName',
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="flex items-center gap-2">
                        {content.labelPractitionerName}
                        <ArrowUpDown size="12" />
                    </span>
                </button>
            )
        },
    },
    {
        accessorKey: 'start',
        header: ({ column }) => {
            return (
                <button
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    <span className="flex items-center gap-2">
                        {content.labelSchedule}
                        <ArrowUpDown size="12" />
                    </span>
                </button>
            )
        },
        cell: ({ row }) => transformDateTime(row.getValue('start')),
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
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
            )
        },
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

export default appointmentTableColumns
