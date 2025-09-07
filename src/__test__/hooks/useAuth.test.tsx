import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAuth } from '@/hooks/useAuth'

vi.mock('@/services/supabaseService', () => ({
    supabase: {
        auth: {
            getSession: vi.fn(),
            onAuthStateChange: vi.fn(),
        },
    },
}))

describe('useAuth', () => {
    const mockUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: {},
    }

    const mockSubscription = {
        unsubscribe: vi.fn(),
    }

    beforeEach(async () => {
        vi.clearAllMocks()
        const { supabase } = await import('@/services/supabaseService')
        vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
            data: { subscription: mockSubscription },
        })
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should initialize with loading state', async () => {
        const { supabase } = await import('@/services/supabaseService')
        vi.mocked(supabase.auth.getSession).mockResolvedValue({
            data: { session: null },
        })

        const { result } = renderHook(() => useAuth())

        expect(result.current.loading).toBe(true)
        expect(result.current.user).toBe(null)
        expect(result.current.isLoggedIn).toBe(false)
    })

    it('should set user and stop loading when session exists', async () => {
        const { supabase } = await import('@/services/supabaseService')
        vi.mocked(supabase.auth.getSession).mockResolvedValue({
            data: { session: { user: mockUser } },
        })

        const { result } = renderHook(() => useAuth())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.user).toEqual(mockUser)
        expect(result.current.isLoggedIn).toBe(true)
    })

    it('should handle no session case', async () => {
        const { supabase } = await import('@/services/supabaseService')
        vi.mocked(supabase.auth.getSession).mockResolvedValue({
            data: { session: null },
        })

        const { result } = renderHook(() => useAuth())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.user).toBe(null)
        expect(result.current.isLoggedIn).toBe(false)
    })

    it('should handle auth state changes', async () => {
        let authStateCallback: ((event: string, session: any) => void) | null =
            null

        const { supabase } = await import('@/services/supabaseService')
        vi.mocked(supabase.auth.getSession).mockResolvedValue({
            data: { session: null },
        })

        vi.mocked(supabase.auth.onAuthStateChange).mockImplementation(
            (callback) => {
                authStateCallback = callback
                return { data: { subscription: mockSubscription } }
            }
        )

        const { result } = renderHook(() => useAuth())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        if (authStateCallback) {
            authStateCallback('SIGNED_IN', { user: mockUser })
        }

        await waitFor(() => {
            expect(result.current.user).toEqual(mockUser)
            expect(result.current.isLoggedIn).toBe(true)
        })
    })

    it('should unsubscribe on unmount', async () => {
        const { supabase } = await import('@/services/supabaseService')
        vi.mocked(supabase.auth.getSession).mockResolvedValue({
            data: { session: null },
        })

        const { unmount } = renderHook(() => useAuth())

        unmount()

        expect(mockSubscription.unsubscribe).toHaveBeenCalled()
    })
})
