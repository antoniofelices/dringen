import type { RoutesProps } from '@shared/types/routes.model'
import { CalendarDays, ClipboardPlus, PlusCircleIcon } from 'lucide-react'

export const physicianMenuTitle = 'Menu Physician'

export const physicianMenu: RoutesProps[] = [
    {
        id: 1,
        icon: CalendarDays,
        url: 'appointment/calendar',
        text: 'Today',
        orderMenu: 1,
    },
    {
        id: 2,
        icon: ClipboardPlus,
        url: '#',
        text: 'My Schedule',
        orderMenu: 2,
    },
    {
        id: 3,
        icon: ClipboardPlus,
        url: 'patient/my-patients',
        text: 'My Patients',
        orderMenu: 3,
    },
    {
        id: 4,
        icon: PlusCircleIcon,
        url: 'patient/add',
        text: 'Add Patient',
        orderMenu: 4,
    },
]
