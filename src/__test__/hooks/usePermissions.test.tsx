import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePermissions } from '@/hooks/usePermissions'
import type { UserRoleType } from '@/types/interfaces'

vi.mock('@hooks/useCurrentUser')

describe('usePermissions', () => {
    const createMockUser = (role: UserRoleType, isActive: boolean = true) => ({
        id: '123',
        email: 'test@example.com',
        user_name: 'Lorem',
        user_last_name: 'Ipsum',
        role,
        is_active: isActive,
    })

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('when user is authenticated and active', () => {
        it('should return correct permissions for admin user', async () => {
            const { useCurrentUser } = await import('@hooks/useCurrentUser')
            vi.mocked(useCurrentUser).mockReturnValue({
                user: createMockUser('admin'),
                isAuthenticated: true,
                isPending: false,
            })

            const { result } = renderHook(() => usePermissions())

            expect(result.current.hasRole('admin')).toBe(true)
            expect(result.current.hasRole('physician')).toBe(false)
            expect(result.current.hasAnyRole(['admin', 'physician'])).toBe(true)
            expect(result.current.hasRouteAccess('DASHBOARD_PANEL')).toBe(true)
            expect(result.current.hasActionPermission('DELETE_PATIENT')).toBe(
                true
            )
            expect(result.current.canAccess(['admin'])).toBe(true)
        })

        it('should return correct permissions for physician user', async () => {
            const { useCurrentUser } = await import('@hooks/useCurrentUser')
            vi.mocked(useCurrentUser).mockReturnValue({
                user: createMockUser('physician'),
                isAuthenticated: true,
                isPending: false,
            })

            const { result } = renderHook(() => usePermissions())

            expect(result.current.hasRole('physician')).toBe(true)
            expect(result.current.hasRole('admin')).toBe(false)
            expect(result.current.hasRouteAccess('CLINICAL_HISTORY')).toBe(true)
            expect(result.current.hasRouteAccess('DASHBOARD_PANEL')).toBe(false)
            expect(result.current.hasActionPermission('CREATE_DIAGNOSIS')).toBe(
                true
            )
            expect(result.current.hasActionPermission('DELETE_PATIENT')).toBe(
                false
            )
        })
    })

    describe('when user is inactive', () => {
        it('should deny all permissions for inactive user', async () => {
            const { useCurrentUser } = await import('@hooks/useCurrentUser')
            vi.mocked(useCurrentUser).mockReturnValue({
                user: createMockUser('admin', false),
                isAuthenticated: true,
                isPending: false,
            })

            const { result } = renderHook(() => usePermissions())

            expect(result.current.hasRole('admin')).toBe(false)
            expect(result.current.hasAnyRole(['admin'])).toBe(false)
            expect(result.current.hasRouteAccess('DASHBOARD_PANEL')).toBe(false)
            expect(result.current.hasActionPermission('DELETE_PATIENT')).toBe(
                false
            )
            expect(result.current.canAccess(['admin'])).toBe(false)
            expect(result.current.isActive).toBe(false)
        })
    })

    describe('utility functions', () => {
        it('should return correct display name', async () => {
            const { useCurrentUser } = await import('@hooks/useCurrentUser')
            vi.mocked(useCurrentUser).mockReturnValue({
                user: createMockUser('admin'),
                isAuthenticated: true,
                isPending: false,
            })

            const { result } = renderHook(() => usePermissions())

            expect(result.current.getDisplayName()).toBe('Lorem Ipsum')
        })

        it('should return "User" as display name when no user', async () => {
            const { useCurrentUser } = await import('@hooks/useCurrentUser')
            vi.mocked(useCurrentUser).mockReturnValue({
                user: null,
                isAuthenticated: false,
                isPending: false,
            })

            const { result } = renderHook(() => usePermissions())

            expect(result.current.getDisplayName()).toBe('User')
        })
    })
})
