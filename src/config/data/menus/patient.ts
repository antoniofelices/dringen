import type { RoutesProps } from '@/types/interfaces'
import {
    CalendarDays,
    ClipboardPlus,
    ChartColumnIncreasing,
    PlusCircleIcon,
} from 'lucide-react'

const patientMenu: RoutesProps[] = [
    {
        id: 1,
        icon: ClipboardPlus,
        url: 'patient/list',
        text: 'List',
        orderMenu: 1,
    },
    {
        id: 2,
        icon: PlusCircleIcon,
        url: 'patient/add',
        text: 'Add Health Consumer',
        orderMenu: 2,
    },
    {
        id: 3,
        icon: CalendarDays,
        url: 'patient/calendar',
        text: 'Calendar',
        orderMenu: 3,
    },
    {
        id: 4,
        icon: ChartColumnIncreasing,
        url: 'patient/stadistics',
        text: 'Stadistics',
        orderMenu: 4,
    },
]

export default patientMenu
