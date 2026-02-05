import type { RoutesProps } from '@shared/types/routes.model'
import {
    Users,
    PlusCircleIcon,
    CalendarDays,
    ClipboardPlus,
} from 'lucide-react'

export const administrativeTitleMenu = 'Menu Administratives'

export const administrativeMenu: RoutesProps[] = [
    {
        id: 1,
        icon: ClipboardPlus,
        url: 'patient/patient-list',
        text: 'Patients List',
        orderMenu: 1,
    },
    {
        id: 2,
        icon: PlusCircleIcon,
        url: 'patient/add',
        text: 'Add Patient',
        orderMenu: 2,
    },
    {
        id: 3,
        icon: CalendarDays,
        url: 'appointment/calendar',
        text: 'Appointments',
        orderMenu: 3,
    },
    {
        id: 4,
        icon: PlusCircleIcon,
        url: 'appointment/add',
        text: 'Add Appointment',
        orderMenu: 4,
    },
    {
        id: 5,
        icon: Users,
        url: 'practitioner/physician-list',
        text: 'Physicians List',
        orderMenu: 5,
    },
]
