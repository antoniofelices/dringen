import type { LucideIcon } from 'lucide-react'
import type { UserRoleType } from '@auth/types/auth.model'

export type NavigationItem = {
    id: number
    icon?: LucideIcon
    url: string
    text: string
    orderMenu?: number
    allowedRoles?: UserRoleType[]
}

export type NavigationGroup = {
    id: string
    title: string
    allowedRoles?: UserRoleType[]
    items: NavigationItem[]
}
