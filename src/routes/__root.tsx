import { createRootRoute, Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import Error404 from '@pages/Error'

const queryClient = new QueryClient()

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: () => <Error404 />,
})

function RootComponent() {
    return (
        <div className="antialiased min-h-dvh">
            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
            <Toaster />
        </div>
    )
}
