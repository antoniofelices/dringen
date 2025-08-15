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

export type FormErrors = {
    isError?: boolean
    noEmailPassword?: boolean
    repeatEmail?: boolean
    register?: boolean
    message?: string
}
