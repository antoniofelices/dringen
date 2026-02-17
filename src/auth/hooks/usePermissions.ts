import { PERMISSIONS } from '@config/permissions'
import { useCurrentUser } from '@auth/hooks/useCurrentUser'
import type { UserRoleType } from '@auth/types/auth.model'

export const usePermissions = () => {
    const { user, isAuthenticated, isPending } = useCurrentUser()

    const hasRole = (_role: UserRoleType): boolean => {
        return isAuthenticated
    }

    const hasAnyRole = (_roles: UserRoleType[]): boolean => {
        return isAuthenticated
    }

    const getDisplayName = (): string => {
        if (!user) return 'User'
        return `${user.firstName} ${user.lastName}`
    }

    const hasRouteAccess = (
        routeKey: keyof typeof PERMISSIONS.ROUTES
    ): boolean => {
        if (!isAuthenticated || isPending) return false
        return hasAnyRole(PERMISSIONS.ROUTES[routeKey])
    }

    const hasActionPermission = (
        actionKey: keyof typeof PERMISSIONS.ACTIONS
    ): boolean => {
        if (!isAuthenticated || isPending) return false
        return hasAnyRole(PERMISSIONS.ACTIONS[actionKey])
    }

    const canAccess = (allowedRoles: UserRoleType[]): boolean => {
        if (!isAuthenticated || isPending) return false
        return hasAnyRole(allowedRoles)
    }

    return {
        user,
        isAuthenticated,
        isPending,
        getDisplayName,
        hasRole,
        hasAnyRole,
        hasRouteAccess,
        hasActionPermission,
        canAccess,
    }
}
