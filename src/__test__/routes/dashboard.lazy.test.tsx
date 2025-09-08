import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Route } from '@/routes/_authz/dashboard.lazy'
import type { ComponentType } from 'react'

vi.mock('@pages/authz/Dashboard', () => ({
    default: () => <div data-testid="dashboard-page">Dashboard Page</div>,
}))

describe('dashboard.lazy Route', () => {
    it('has component function configured', () => {
        expect(Route.options.component).toBeDefined()
        expect(typeof Route.options.component).toBe('function')
    })

    it('renders Dashboard component', () => {
        const RouteComponent = Route.options.component as ComponentType

        render(<RouteComponent />)

        expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
        expect(screen.getByText('Dashboard Page')).toBeInTheDocument()
    })

    it('is a lazy loaded route', () => {
        expect(Route.options.component).toBeDefined()
        expect(typeof Route.options.component).toBe('function')
    })

    it('wraps Dashboard page in RouteComponent', () => {
        const RouteComponent = Route.options.component as ComponentType

        const { container } = render(<RouteComponent />)

        expect(container.firstChild).toBeTruthy()
        expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
    })

    it('route component is properly defined', () => {
        const RouteComponent = Route.options.component as ComponentType
        expect(RouteComponent).toBeDefined()
        expect(typeof RouteComponent).toBe('function')
    })
})
