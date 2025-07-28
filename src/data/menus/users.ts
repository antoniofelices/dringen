import type { RoutesProps } from '@/types/interfaces'

const user: RoutesProps[] = [
    {
        id: 1,
        url: 'user/list',
        text: 'List',
        orderMenu: 1,
    },
    {
        id: 2,
        url: 'user/stadistics',
        text: 'Stadistics',
        orderMenu: 2,
    },
    {
        id: 3,
        url: 'user/profile',
        text: 'Your Profile',
        orderMenu: 3,
    },
]

export default user
