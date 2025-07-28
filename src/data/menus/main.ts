import type { RoutesProps } from '@/types/interfaces'

const main: RoutesProps[] = [
    {
        id: 1,
        url: '/',
        text: 'Home',
        orderMenu: 1,
    },
    {
        id: 2,
        url: 'health-consumer/list',
        text: 'Health Consumers',
        orderMenu: 2,
    },
]

export default main
