import { Navigate } from '@tanstack/react-router'
import { usePermissions } from '@auth/hooks/usePermissions'
import type { ProtectedRouteType } from '@auth/types/auth.model'
import Loading from '@shared/components/ui/Loading'

const ProtectedRoute = ({
    children,
    allowedRoles,
    fallbackPath = '/unauthorized',
}: ProtectedRouteType) => {
    const { isAuthenticated, canAccess, isPending } = usePermissions()

    if (isPending) {
        return <Loading />
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />
    }

    if (!canAccess(allowedRoles)) {
        return <Navigate to={fallbackPath} />
    }

    return <>{children}</>
}

export default ProtectedRoute
