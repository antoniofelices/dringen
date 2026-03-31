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
        url: 'communication/communication-list',
        text: 'Comumnications',
        orderMenu: 2,
    },
    {
        id: 3,
        icon: PlusCircleIcon,
        url: 'communication/add',
        text: 'Add Communication',
        orderMenu: 3,
    },
]
