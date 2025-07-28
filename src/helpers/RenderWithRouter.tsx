import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import {
    RouterProvider,
    createMemoryHistory,
    createRouter,
} from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'

export function RenderWithRouter(ui: ReactNode, path = '/') {
    const router = createRouter({
        routeTree,
        history: createMemoryHistory({ initialEntries: [path] }),
    })

    const Wrapper = () => <RouterProvider router={router} />

    return render(ui, { wrapper: Wrapper })
}
