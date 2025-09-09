import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Route } from '@/routes/_authz/user/list.lazy'
import type { Tables } from '@/types/database.types'
import type { ReactNode, ComponentType } from 'react'

vi.mock('@/pages/authz/ListUser', () => ({
    default: () => <div data-testid="list-user-page">List User Page</div>,
}))

vi.mock('@/components/ProtectedRoute', () => ({
    default: ({
        children,
        allowedRoles,
    }: {
        children: ReactNode
        allowedRoles: Tables<'medical_user'>['role'][]
    }) => (
        <div
            data-testid="protected-route"
            data-allowed-roles={allowedRoles.join(',')}
        >
            {children}
        </div>
    ),
}))

describe('user/list.lazy Route', () => {
    it('has component function configured', () => {
        expect(Route.options.component).toBeDefined()
        expect(typeof Route.options.component).toBe('function')
    })

    it('renders ListUser component wrapped in ProtectedRoute', () => {
        const RouteComponent = Route.options.component as ComponentType

        render(<RouteComponent />)

        expect(screen.getByTestId('protected-route')).toBeInTheDocument()
        expect(screen.getByTestId('list-user-page')).toBeInTheDocument()
        expect(screen.getByText('List User Page')).toBeInTheDocument()
    })

    it('protects route with admin role requirement', () => {
        const RouteComponent = Route.options.component as ComponentType

        render(<RouteComponent />)

        const protectedRoute = screen.getByTestId('protected-route')
        expect(protectedRoute).toHaveAttribute('data-allowed-roles', 'admin')
    })

    it('is a lazy loaded route', () => {
        expect(Route.options.component).toBeDefined()
        expect(typeof Route.options.component).toBe('function')
    })

    it('route component wraps ListUser in ProtectedRoute', () => {
        const RouteComponent = Route.options.component as ComponentType
        expect(RouteComponent).toBeDefined()
        expect(typeof RouteComponent).toBe('function')
    })

    it('nests ListUser component inside ProtectedRoute', () => {
        const RouteComponent = Route.options.component as ComponentType

        const { container } = render(<RouteComponent />)

        // Check the nesting structure
        const protectedRoute = screen.getByTestId('protected-route')
        const listUserPage = screen.getByTestId('list-user-page')

        expect(protectedRoute).toContainElement(listUserPage)
    })

    it('restricts access to admin users only', () => {
        const RouteComponent = Route.options.component as ComponentType

        render(<RouteComponent />)

        const protectedRoute = screen.getByTestId('protected-route')
        const allowedRoles = protectedRoute.getAttribute('data-allowed-roles')

        expect(allowedRoles).toBe('admin')
        expect(allowedRoles).not.toContain('user')
        expect(allowedRoles).not.toContain('physician')
        expect(allowedRoles).not.toContain('medical_office')
    })
})
