import type { RoutesProps } from '@shared/types/routes.model'
import { Users, UserRoundPlus } from 'lucide-react'

const usersMenu: RoutesProps[] = [
    {
        id: 1,
        icon: Users,
        url: 'practitioner/list',
        text: 'Practititioners List',
        orderMenu: 1,
    },
    {
        id: 2,
        icon: UserRoundPlus,
        url: 'practitioner/add',
        text: 'Add Practititioner',
        orderMenu: 2,
    },
]

export default usersMenu
