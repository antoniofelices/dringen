import { permissions } from '@auth/config/permissions'
import { useCurrentUser } from '@auth/hooks/useCurrentUser'
import { usePractitionerRoleDetail } from '@resources/practitioner-role/hooks/usePractitionerRole'
import type { UserRoleType } from '@auth/types/auth.model'

export const usePermissions = () => {
    const { user, isAuthenticated, isPending: isUserPending } = useCurrentUser()
    const { practitionerRole, isPending: isRolePending } =
        usePractitionerRoleDetail(user?.id ?? '')

    const isPending = isUserPending || isRolePending

    const hasRole = (role: UserRoleType): boolean => {
        if (!isAuthenticated || !practitionerRole) return false
        return practitionerRole.role === role
    }

    const hasAnyRole = (roles: UserRoleType[]): boolean => {
        if (!isAuthenticated || !practitionerRole) return false
        return roles.includes(practitionerRole.role as UserRoleType)
    }

    const getDisplayName = (): string => {
        if (!user) return 'User'
        return `${user.firstName} ${user.lastName}`
    }

    const hasRouteAccess = (
        routeKey: keyof typeof permissions.ROUTES
    ): boolean => {
        if (!isAuthenticated || isPending) return false
        return hasAnyRole(permissions.ROUTES[routeKey])
    }

    const hasActionPermission = (
        actionKey: keyof typeof permissions.ACTIONS
    ): boolean => {
        if (!isAuthenticated || isPending) return false
        return hasAnyRole(permissions.ACTIONS[actionKey])
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
