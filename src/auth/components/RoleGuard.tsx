import { usePermissions } from '@auth/hooks/usePermissions'
import Loading from '@shared/components/ui/Loading'
import type { RoleGuardType } from '@auth/types/auth.model'

const RoleGuard = ({
    children,
    allowedRoles,
    fallback = null,
    showLoadingFallback = false,
}: RoleGuardType) => {
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
