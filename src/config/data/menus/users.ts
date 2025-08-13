import type { RoutesProps } from '@/types/interfaces'
import { Users, UserRoundPlus, ShieldUser } from 'lucide-react'

const user: RoutesProps[] = [
    {
        id: 1,
        icon: Users,
        url: 'user/list',
        text: 'Users List',
        orderMenu: 1,
    },
    {
        id: 2,
        icon: UserRoundPlus,
        url: 'user/add',
        text: 'Add User',
        orderMenu: 2,
    },
    {
        id: 3,
        icon: ShieldUser,
        url: 'user/profile',
        text: 'My Profile',
        orderMenu: 3,
    },
]

export default user
