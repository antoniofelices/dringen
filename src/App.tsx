import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { ThemeProvider } from 'flowbite-react'
import baseTheme from '@/styles/baseTheme'

const router = createRouter({
    routeTree,
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const App = () => {
    return (
        <ThemeProvider theme={baseTheme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App
