import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import {
    RouterProvider,
    createMemoryHistory,
    createRouter,
} from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from '@/routeTree.gen'
import { vi } from 'vitest'
import type { User } from '@supabase/supabase-js'

type RenderWithRouterOptions = {
    path?: string
    authenticated?: boolean
    userSession?: User | null
}

export function RenderWithRouter(
    ui: ReactNode,
    options: RenderWithRouterOptions = {}
) {
    const { path = '/', authenticated = false, userSession = null } = options

    vi.doMock('@/services/supabaseService', () => ({
        supabase: {
            auth: {
                getSession: vi.fn().mockResolvedValue({
                    data: {
                        session: authenticated
                            ? {
                                  user: userSession,
                                  access_token: 'token',
                                  refresh_token: 'refresh',
                                  expires_in: 3600,
                                  token_type: 'bearer',
                              }
                            : null,
                    },
                    error: null,
                }),
                onAuthStateChange: vi.fn().mockReturnValue({
                    data: { subscription: { unsubscribe: vi.fn() } },
                }),
            },
        },
    }))

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    })

    const router = createRouter({
        routeTree,
        history: createMemoryHistory({ initialEntries: [path] }),
        context: {
            queryClient,
        },
    })

    const Wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {children}
        </QueryClientProvider>
    )

    return render(ui, { wrapper: Wrapper })
}
