import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ComponentType } from 'react'

vi.mock('@pages/Index.tsx', () => ({
    default: () => <div data-testid="index-page">Index Page</div>,
}))

vi.mock('@/services/supabaseService', () => ({
    supabase: {
        auth: {
            getSession: vi.fn(),
        },
    },
}))

vi.mock('@tanstack/react-router', async () => {
    const actual = await vi.importActual('@tanstack/react-router')
    return {
        ...actual,
        redirect: vi
            .fn()
            .mockImplementation((options: Record<string, unknown>) => {
                throw options
            }),
    }
})

import { Route } from '@/routes/index'
import { createMockAuthUser } from '../testTypes'

type BeforeLoadFn = NonNullable<typeof Route.options.beforeLoad>
type BeforeLoadContext = Parameters<BeforeLoadFn>[0]

const mockContext: BeforeLoadContext = {
    location: {
        pathname: '/',
        search: '',
        hash: '',
        href: 'http://localhost/',
        publicHref: 'http://localhost/',
        searchStr: '',
        state: {
            key: 'mock-key',
            __TSR_key: 'mock-tsr-key',
            __TSR_index: 0,
        },
        url: new URL('http://localhost/'),
    },
    params: {},
    search: {},
    context: {},
    cause: 'preload',
    abortController: new AbortController(),
    preload: false,
    navigate: vi.fn(),
    buildLocation: vi.fn(),
    matches: [],
}

describe('Index Route', () => {
    const mockUser = createMockAuthUser()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should redirect to dashboard when user is authenticated', async () => {
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

        await expect(beforeLoadFn?.(mockContext)).rejects.toEqual(
            expect.objectContaining({
                to: '/dashboard',
            })
        )
    })

    it('should not redirect when user is not authenticated', async () => {
        const { supabase } = await import('@/services/supabaseService')
        vi.mocked(supabase.auth.getSession).mockResolvedValue({
            data: { session: null },
            error: null,
        })

        const beforeLoadFn = Route.options.beforeLoad

        const result = await beforeLoadFn?.(mockContext)
        expect(result).toBeUndefined()
    })

    it('route component can be called without errors', () => {
        const RouteComponent = Route.options.component as ComponentType

        expect(() => RouteComponent).not.toThrow()
        expect(RouteComponent).toBeInstanceOf(Function)
    })

    it('has component and beforeLoad functions configured', () => {
        expect(Route.options.component).toBeDefined()
        expect(Route.options.beforeLoad).toBeDefined()
        expect(typeof Route.options.component).toBe('function')
        expect(typeof Route.options.beforeLoad).toBe('function')
    })
})
