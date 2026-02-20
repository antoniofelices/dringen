import type { RoutesProps } from '@shared/types/routes.model'
import { CalendarDays, ClipboardPlus, Users, PlusCircle } from 'lucide-react'

export const physicianMenuTitle = 'Menu Physician'

export const physicianMenu = (practitionerId: string): RoutesProps[] => [
    {
        id: 1,
        icon: CalendarDays,
        url: `/practitioner/${practitionerId}/today`,
        text: 'Today',
        orderMenu: 1,
    },
    {
        id: 2,
        icon: ClipboardPlus,
        url: `/practitioner/${practitionerId}/schedule`,
        text: 'My Schedule',
        orderMenu: 2,
    },
    {
        id: 3,
        icon: Users,
        url: `/practitioner/${practitionerId}/patient-list`,
        text: 'My Patients',
        orderMenu: 3,
    },
    {
        id: 4,
        icon: PlusCircle,
        url: 'patient/add',
        text: 'Add Patient',
        orderMenu: 4,
    },
]
