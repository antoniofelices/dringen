import { permissions } from '@auth/config/permissions'
import { useCurrentUser } from '@auth/hooks/useCurrentUser'
import { useAuthContext } from '@auth/hooks/useAuthContext'
import type { UserRoleType } from '@auth/types/auth.model'

export const usePermissions = () => {
    const { role, loading } = useAuthContext()
    const { user, isAuthenticated } = useCurrentUser()

    const hasRole = (userRole: UserRoleType): boolean => {
        if (!isAuthenticated || !role) return false
        return role === userRole
    }

    const hasAnyRole = (roles: UserRoleType[]): boolean => {
        if (!isAuthenticated || !role) return false
        return roles.includes(role)
    }

    const getDisplayName = (): string => {
        if (!user) return 'User'
        return `${user.firstName} ${user.lastName}`
    }

    const hasRouteAccess = (
        routeKey: keyof typeof permissions.ROUTES
    ): boolean => {
        if (!isAuthenticated || loading) return false
        return hasAnyRole(permissions.ROUTES[routeKey])
    }

    const hasActionPermission = (
        actionKey: keyof typeof permissions.ACTIONS
    ): boolean => {
        if (!isAuthenticated || loading) return false
        return hasAnyRole(permissions.ACTIONS[actionKey])
    }

    const canAccess = (allowedRoles: UserRoleType[]): boolean => {
        if (!isAuthenticated || loading) return false
        return hasAnyRole(allowedRoles)
    }

    return {
        user,
        isAuthenticated,
        isPending: loading,
        getDisplayName,
        hasRole,
        hasAnyRole,
        hasRouteAccess,
        hasActionPermission,
        canAccess,
    }
}
