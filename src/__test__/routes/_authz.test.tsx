import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Route } from '@/routes/_authz'
import type { ReactNode, ComponentType } from 'react'

vi.mock('@/services/supabaseService', () => ({
    supabase: {
        auth: {
            getSession: vi.fn(),
        },
    },
}))

vi.mock('@/context/ThemeProvider', () => ({
    default: ({ children }: { children: ReactNode }) => (
        <div data-testid="theme-provider">{children}</div>
    ),
}))

vi.mock('@/layouts/authz/Main', () => ({
    default: ({ children }: { children: ReactNode }) => (
        <div data-testid="main-authz-layout">{children}</div>
    ),
}))

vi.mock('@/components/ui/base/sidebar', () => ({
    SidebarProvider: ({ children }: { children: ReactNode }) => (
        <div data-testid="sidebar-provider">{children}</div>
    ),
}))

vi.mock('@/layouts/authz/Aside', () => ({
    default: () => <aside data-testid="aside">Aside Content</aside>,
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

describe('_authz Route', () => {
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

    it('route component is properly defined', () => {
        const RouteComponent = Route.options.component as ComponentType

        expect(RouteComponent).toBeDefined()
        expect(typeof RouteComponent).toBe('function')
    })
})
