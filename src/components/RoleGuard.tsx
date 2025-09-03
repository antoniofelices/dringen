import { usePermissions } from '@/hooks/usePermissions'
import type { ReactNode } from 'react'
import type { UserRoleType } from '@/types/interfaces'
import Loading from '@components/ui/Loading'

type Props = {
    children: ReactNode
    allowedRoles: UserRoleType[]
    fallback?: ReactNode
    requireActive?: boolean
    showLoadingFallback?: boolean
}

const RoleGuard = ({
    children,
    allowedRoles,
    fallback = null,
    showLoadingFallback = false,
}: Props) => {
    const { canAccess, isPending } = usePermissions()

    if (isPending && showLoadingFallback) {
        return <Loading />
    }

    if (isPending) {
        return null
    }

    const hasAccess = canAccess(allowedRoles)

    return hasAccess ? <>{children}</> : <>{fallback}</>
}

export default RoleGuard
