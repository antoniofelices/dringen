import type { RoutesProps } from '@/types/interfaces'
import { Users, UserRoundPlus } from 'lucide-react'

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
]

export default user
