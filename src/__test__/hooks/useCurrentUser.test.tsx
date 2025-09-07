import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import type { ReactNode } from 'react'

vi.mock('@hooks/useAuth')
vi.mock('@/services/supabaseService')

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    })

    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

describe('useCurrentUser', () => {
    const mockAuthUser = {
        id: '123',
        email: 'test@example.com',
    }

    const mockUserData = {
        id: '123',
        email: 'test@example.com',
        user_name: 'Lorem',
        user_last_name: 'Ipsum',
        role: 'admin',
        is_active: true,
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return pending state when auth is loading', async () => {
        const { useAuth } = await import('@hooks/useAuth')
        vi.mocked(useAuth).mockReturnValue({
            user: null,
            loading: true,
        })

        const { result } = renderHook(() => useCurrentUser(), {
            wrapper: createWrapper(),
        })

        expect(result.current.isPending).toBe(true)
        expect(result.current.isAuthenticated).toBe(false)
    })

    it('should fetch user data when authenticated', async () => {
        const { useAuth } = await import('@hooks/useAuth')
        const { getSingleUser } = await import('@/services/supabaseService')

        vi.mocked(useAuth).mockReturnValue({
            user: mockAuthUser,
            loading: false,
        })
        vi.mocked(getSingleUser).mockResolvedValue(mockUserData)

        const { result } = renderHook(() => useCurrentUser(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => {
            expect(result.current.isPending).toBe(false)
        })

        expect(getSingleUser).toHaveBeenCalledWith('123')
        expect(result.current.user).toEqual(mockUserData)
        expect(result.current.authUser).toEqual(mockAuthUser)
        expect(result.current.isAuthenticated).toBe(true)
    })

    it('should not fetch user data when not authenticated', async () => {
        const { useAuth } = await import('@hooks/useAuth')
        const { getSingleUser } = await import('@/services/supabaseService')

        vi.mocked(useAuth).mockReturnValue({
            user: null,
            loading: false,
        })

        renderHook(() => useCurrentUser(), {
            wrapper: createWrapper(),
        })

        expect(getSingleUser).not.toHaveBeenCalled()
    })

    it('should handle fetch errors', async () => {
        const { useAuth } = await import('@hooks/useAuth')
        const { getSingleUser } = await import('@/services/supabaseService')

        vi.mocked(useAuth).mockReturnValue({
            user: mockAuthUser,
            loading: false,
        })
        const error = new Error('Fetch failed')
        vi.mocked(getSingleUser).mockRejectedValue(error)

        const { result } = renderHook(() => useCurrentUser(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => {
            expect(result.current.isError).toBe(true)
        })

        expect(result.current.error).toEqual(error)
    })
})
