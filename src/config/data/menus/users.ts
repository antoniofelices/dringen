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
        url: 'user/profile',
        text: 'My Profile',
        orderMenu: 2,
    },
]

export default user
