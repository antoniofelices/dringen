import type { RoutesProps } from '@/types/interfaces'

const healthConsumers: RoutesProps[] = [
    {
        id: 1,
        url: 'health-consumer/list',
        text: 'List',
        orderMenu: 1,
    },
    {
        id: 2,
        url: 'health-consumer/stadistics',
        text: 'Stadistics',
        orderMenu: 2,
    },
]

export default healthConsumers
