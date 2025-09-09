import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Route } from '@/routes/_authn'
import type { ReactNode, ComponentType } from 'react'

vi.mock('@/services/supabaseService', () => ({
    supabase: {
        auth: {
            getSession: vi.fn(),
        },
    },
}))

vi.mock('@layouts/authn/Main', () => ({
    default: ({ children }: { children: ReactNode }) => (
        <div data-testid="main-authn-layout">{children}</div>
    ),
}))

vi.mock('@tanstack/react-router', async () => {
    const actual = await vi.importActual('@tanstack/react-router')
    return {
        ...actual,
        Outlet: () => <div data-testid="outlet">Outlet Content</div>,
        redirect: vi.fn().mockImplementation((options) => {
            throw options
        }),
    }
})

describe('_authn Route', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('component exists and is a function', () => {
        const RouteComponent = Route.options.component as ComponentType

        expect(RouteComponent).toBeDefined()
        expect(typeof RouteComponent).toBe('function')
    })

    it('has component and beforeLoad functions configured', () => {
        expect(Route.options.component).toBeDefined()
        expect(Route.options.beforeLoad).toBeDefined()
        expect(typeof Route.options.component).toBe('function')
        expect(typeof Route.options.beforeLoad).toBe('function')
    })
})
