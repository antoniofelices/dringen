import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route } from '@/routes/__root'

vi.mock('@pages/Error', () => ({
    default: () => <div>Error 404 - Page Not Found</div>,
}))

vi.mock('sonner', () => ({
    Toaster: () => <div data-testid="toaster">Toaster</div>,
}))

vi.mock('@tanstack/react-router', async () => {
    const actual = await vi.importActual('@tanstack/react-router')
    return {
        ...actual,
        Outlet: () => <div data-testid="outlet">Outlet Content</div>,
    }
})

describe('Root Route Component', () => {
    let queryClient: QueryClient

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        })
    })

    it('renders root component with QueryClientProvider and Toaster', () => {
        const TestComponent = Route.options.component as React.ComponentType

        render(
            <QueryClientProvider client={queryClient}>
                <TestComponent />
            </QueryClientProvider>
        )

        expect(screen.getByTestId('toaster')).toBeInTheDocument()
    })

    it('has correct notFoundComponent configured', () => {
        const NotFoundComponent = Route.options
            .notFoundComponent as React.ComponentType

        render(<NotFoundComponent />)

        expect(
            screen.getByText('Error 404 - Page Not Found')
        ).toBeInTheDocument()
    })

    it('applies correct CSS classes to root container', () => {
        const TestComponent = Route.options.component as React.ComponentType

        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <TestComponent />
            </QueryClientProvider>
        )

        const rootDiv = container.firstChild as HTMLElement
        expect(rootDiv).toHaveClass('antialiased', 'min-h-dvh')
    })

    it('should have root route configuration', () => {
        expect(Route.options.component).toBeDefined()
        expect(Route.options.notFoundComponent).toBeDefined()
    })
})
