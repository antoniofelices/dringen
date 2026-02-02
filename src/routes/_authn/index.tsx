import { createFileRoute } from '@tanstack/react-router'
import Index from '@pages/Index.tsx'

export const Route = createFileRoute(`/_authn/`)({
    component: RouteComponent,
})

function RouteComponent() {
    return <Index />
}
