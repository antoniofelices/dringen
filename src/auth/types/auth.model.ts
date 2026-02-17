import type { ReactNode } from 'react'
import { z } from 'zod'
import type { VariantProps } from 'class-variance-authority'
import { buttonVariants } from '@shared/components/ui/base/button'
import { signInSchema } from '@auth/schemas/auth.schema'

export type SignInFormType = z.infer<typeof signInSchema>

export type UserRoleType = 'admin' | 'medical_office' | 'physician'

export type ButtonSignOutType = VariantProps<typeof buttonVariants> & {
    asbutton?: boolean
    className?: string
    children?: React.ReactNode
}

export type RoleGuardType = {
    children: ReactNode
    allowedRoles: UserRoleType[]
    fallback?: ReactNode
    requireActive?: boolean
    showLoadingFallback?: boolean
}

export type ProtectedRouteType = {
    children: ReactNode
    allowedRoles: UserRoleType[]
    fallbackPath?: string
    requireActive?: boolean
}
