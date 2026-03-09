import type { ColumnDef } from '@tanstack/react-table'
import type { AppointmentType } from '@resources/appointment/types/appointment.model'
import { ArrowUpDown } from 'lucide-react'
import content from './appointmentTable.content'

const practitionerTableColumns = (): ColumnDef<AppointmentType>[] => [
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
        accessorKey: 'start',
        header: () => {
            return (
                <span className="flex items-center gap-2">
                    {content.labelDay} - {content.labelHour}
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
    },
]

export default practitionerTableColumns
