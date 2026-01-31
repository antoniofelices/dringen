import { useCurrentUser } from '@hooks/useCurrentUser'
import { PERMISSIONS } from '@/config/permissions'
import type { UserRoleType } from '@/types/interfaces'

export const usePermissions = () => {
    const { user, isAuthenticated, isPending } = useCurrentUser()

    const hasRole = (role: UserRoleType): boolean => {
        return user?.role === role && user?.is_active === true
    }

    const hasAnyRole = (roles: UserRoleType[]): boolean => {
        if (!user?.role || !user?.is_active) return false
        return roles.includes(user.role)
    }

    const isActive = (): boolean => {
        return user?.is_active ?? false
    }

    const getUserRole = (): UserRoleType | null => {
        return user?.role ?? null
    }

    const getDisplayName = (): string => {
        if (!user) return 'User'
        return `${user.user_name} ${user.user_last_name}`
    }

    const hasRouteAccess = (
        routeKey: keyof typeof PERMISSIONS.ROUTES
    ): boolean => {
        if (!isAuthenticated || !isActive() || isPending) return false
        return hasAnyRole(PERMISSIONS.ROUTES[routeKey])
    }

    const hasActionPermission = (
        actionKey: keyof typeof PERMISSIONS.ACTIONS
    ): boolean => {
        if (!isAuthenticated || !isActive() || isPending) return false
        return hasAnyRole(PERMISSIONS.ACTIONS[actionKey])
    }

    const canAccess = (allowedRoles: UserRoleType[]): boolean => {
        if (!isAuthenticated || !isActive() || isPending) return false
        return hasAnyRole(allowedRoles)
    }

    return {
        user,
        userRole: getUserRole(),
        isActive: isActive(),
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
