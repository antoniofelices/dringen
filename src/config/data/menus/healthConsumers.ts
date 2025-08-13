import type { RoutesProps } from '@/types/interfaces'
import { ClipboardPlus, ChartColumnIncreasing } from 'lucide-react'

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
        icon: ChartColumnIncreasing,
        url: 'health-consumer/stadistics',
        text: 'Stadistics',
        orderMenu: 2,
    },
]

export default healthConsumers
