import type { RoutesProps } from '@shared/types/routes.model'
import { Info, PlusCircleIcon } from 'lucide-react'

export const administrativeHrMenuTitle = 'Menu Administrarive HR'

export const administrativeHrMenu: RoutesProps[] = [
    {
        id: 1,
        icon: PlusCircleIcon,
        url: 'practitioner/add',
        text: 'Add Practitioner',
        orderMenu: 1,
    },
    {
        id: 2,
        icon: Info,
        url: '#',
        text: 'Comunications',
        orderMenu: 2,
    },
    {
        id: 3,
        icon: PlusCircleIcon,
        url: '#',
        text: 'Add Comunication',
        orderMenu: 3,
    },
]
