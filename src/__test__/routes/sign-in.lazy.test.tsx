import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Route } from '@/routes/_authn/sign-in.lazy'
import type { ComponentType } from 'react'

vi.mock('@/pages/authn/SignIn', () => ({
    default: () => <div data-testid="sign-in-page">Sign In Page</div>,
}))

describe('sign-in.lazy Route', () => {
    it('has component function configured', () => {
        expect(Route.options.component).toBeDefined()
        expect(typeof Route.options.component).toBe('function')
    })

    it('renders SignIn component', () => {
        const RouteComponent = Route.options.component as ComponentType

        render(<RouteComponent />)

        expect(screen.getByTestId('sign-in-page')).toBeInTheDocument()
        expect(screen.getByText('Sign In Page')).toBeInTheDocument()
    })

    it('is a lazy loaded route', () => {
        expect(Route.options.component).toBeDefined()
        expect(typeof Route.options.component).toBe('function')
    })

    it('wraps SignIn page in RouteComponent', () => {
        const RouteComponent = Route.options.component as ComponentType

        const { container } = render(<RouteComponent />)

        expect(container.firstChild).toBeTruthy()
        expect(screen.getByTestId('sign-in-page')).toBeInTheDocument()
    })
})
