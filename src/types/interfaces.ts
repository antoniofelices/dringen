import type { ButtonHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string | undefined
    classes?: string
    url?: string
    variant?: 'blue' | 'transparent'
    icon?: boolean
    orientationIcon?: 'right' | 'left'
}

export type RoutesProps = {
    id: number
    icon?: LucideIcon
    url: string
    text: string
    orderMenu?: number
}

export type DataTablePatient = {
    id: string
    user_name: string
    user_last_name: string
    dni?: string
}

export type DataTableUser = {
    id: string
    user_name: string
    user_last_name: string
    dni?: string
    role?: string
}
