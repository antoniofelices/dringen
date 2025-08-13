import type { RoutesProps } from '@/types/interfaces'

const user: RoutesProps[] = [
    {
        id: 1,
        url: 'user/list',
        text: 'Users List',
        orderMenu: 1,
    },
    {
        id: 2,
        url: 'user/add',
        text: 'Add User',
        orderMenu: 2,
    },
    {
        id: 3,
        url: 'user/profile',
        text: 'My Profile',
        orderMenu: 3,
    },
]

export default user
