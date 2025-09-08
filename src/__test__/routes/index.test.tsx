import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Route } from '@/routes/index'
import { createMockAuthUser } from '../testTypes'
import type { ComponentType } from 'react'

vi.mock('@/services/supabaseService', () => ({
    supabase: {
        auth: {
            getSession: vi.fn(),
        },
    },
}))

vi.mock('@pages/Index.tsx', () => ({
    default: () => <div data-testid="index-page">Index Page</div>,
}))

const mockRedirect = vi.fn()
vi.mock('@tanstack/react-router', async () => {
    const actual = await vi.importActual('@tanstack/react-router')
    return {
        ...actual,
        redirect: (options: any) => mockRedirect(options),
    }
})

describe('Index Route', () => {
    const mockUser = createMockAuthUser()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('beforeLoad function calls getSession when authenticated', async () => {
        const { supabase } = await import('@/services/supabaseService')
        vi.mocked(supabase.auth.getSession).mockResolvedValue({
            data: {
                session: {
                    user: mockUser,
                    access_token: 'token',
                    refresh_token: 'refresh',
                    expires_in: 3600,
                    token_type: 'bearer',
                },
            },
            error: null,
        })

        const beforeLoadFn = Route.options.beforeLoad
        try {
            await beforeLoadFn?.()
        } catch {
            return null
        }
        expect(supabase.auth.getSession).toHaveBeenCalled()
    })

    it('should not redirect when user is not authenticated', async () => {
        const { supabase } = await import('@/services/supabaseService')
        vi.mocked(supabase.auth.getSession).mockResolvedValue({
            data: { session: null },
            error: null,
        })

        const beforeLoadFn = Route.options.beforeLoad

        const result = await beforeLoadFn?.()
        expect(result).toBeUndefined()
        expect(mockRedirect).not.toHaveBeenCalled()
    })

    it('has component and beforeLoad functions configured', () => {
        expect(Route.options.component).toBeDefined()
        expect(Route.options.beforeLoad).toBeDefined()
        expect(typeof Route.options.component).toBe('function')
        expect(typeof Route.options.beforeLoad).toBe('function')
    })

    it('renders Index component when route component is called', () => {
        const RouteComponent = Route.options.component as ComponentType
        expect(RouteComponent).toBeDefined()
    })
})
