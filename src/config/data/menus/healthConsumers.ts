import type { RoutesProps } from '@/types/interfaces'
import {
    ClipboardPlus,
    ChartColumnIncreasing,
    PlusCircleIcon,
} from 'lucide-react'

const healthConsumers: RoutesProps[] = [
    {
        id: 1,
        icon: ClipboardPlus,
        url: 'health-consumer/list',
        text: 'List',
        orderMenu: 1,
    },
    {
        id: 2,
        icon: PlusCircleIcon,
        url: 'health-consumer/add',
        text: 'Add Health Consumer',
        orderMenu: 2,
    },
    {
        id: 3,
        icon: ChartColumnIncreasing,
        url: 'health-consumer/stadistics',
        text: 'Stadistics',
        orderMenu: 3,
    },
]

export default healthConsumers
