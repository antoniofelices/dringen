import { Navigate } from '@tanstack/react-router'
import { usePermissions } from '@hooks/usePermissions'
import type { ReactNode } from 'react'
import type { UserRoleType } from '@/types/interfaces'
import Loading from '@components/ui/Loading'

type Props = {
    children: ReactNode
    allowedRoles: UserRoleType[]
    fallbackPath?: string
    requireActive?: boolean
}

const ProtectedRoute = ({
    children,
    allowedRoles,
    fallbackPath = '/unauthorized',
}: Props) => {
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
