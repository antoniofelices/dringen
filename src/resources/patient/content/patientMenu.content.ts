import type { RoutesProps } from '@shared/types/routes.model'
import {
    CalendarDays,
    ClipboardPlus,
    ChartColumnIncreasing,
    PlusCircleIcon,
} from 'lucide-react'

const patientsMenu: RoutesProps[] = [
    {
        id: 1,
        icon: ClipboardPlus,
        url: 'patient/list',
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
        icon: ChartColumnIncreasing,
        url: 'patient/statistics',
        text: 'Statistics',
        orderMenu: 4,
    },
]

export default patientsMenu
