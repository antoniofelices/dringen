import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Error404 from '@pages/Error'

const queryClient = new QueryClient()

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: () => <Error404 />,
})

function RootComponent() {
    return (
        <div className="antialiased bg-gray-100 text-gray-900 dark:text-white dark:bg-blue-900 min-h-dvh">
            <QueryClientProvider client={queryClient}>
                <Outlet />
                <TanStackRouterDevtools />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </div>
    )
}
