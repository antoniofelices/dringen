import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAuth } from '@/hooks/useAuth'
import { createMockAuthUser, createMockSubscription } from '../testTypes'

vi.mock('@/services/supabaseService', () => ({
    supabase: {
        auth: {
            getSession: vi.fn(),
            onAuthStateChange: vi.fn(),
        },
    },
}))

describe('useAuth', () => {
    const mockUser = createMockAuthUser()
    const mockSubscription = createMockSubscription()

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
            error: null,
        })

        const { result } = renderHook(() => useAuth())

        expect(result.current.loading).toBe(true)
        expect(result.current.user).toBe(null)
        expect(result.current.isLoggedIn).toBe(false)
    })

    it('should set user and stop loading when session exists', async () => {
        const { supabase } = await import('@/services/supabaseService')
        vi.mocked(supabase.auth.getSession).mockResolvedValue({
            data: { session: { user: mockUser, access_token: 'token', refresh_token: 'refresh', expires_in: 3600, token_type: 'bearer' } },
            error: null,
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
            error: null,
        })

        const { result } = renderHook(() => useAuth())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.user).toBe(null)
        expect(result.current.isLoggedIn).toBe(false)
    })

    it('should handle auth state changes', async () => {
        const { supabase } = await import('@/services/supabaseService')
        vi.mocked(supabase.auth.getSession).mockResolvedValue({
            data: { session: null },
            error: null,
        })

        const { result } = renderHook(() => useAuth())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.user).toBe(null)
        expect(result.current.isLoggedIn).toBe(false)
    })

    it('should unsubscribe on unmount', async () => {
        const { supabase } = await import('@/services/supabaseService')
        vi.mocked(supabase.auth.getSession).mockResolvedValue({
            data: { session: null },
            error: null,
        })

        const { unmount } = renderHook(() => useAuth())
        
        unmount()

        expect(mockSubscription.unsubscribe).toHaveBeenCalled()
    })
})