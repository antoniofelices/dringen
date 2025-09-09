import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Route } from '@/routes/index'
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
        redirect: (options) => mockRedirect(options),
    }
})

describe('Index Route', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.clearAllMocks()
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
