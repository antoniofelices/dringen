import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '@/services/supabaseService'
import Index from '@pages/Index.tsx'

export const Route = createFileRoute(`/`)({
    beforeLoad: async () => {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
            throw redirect({ to: '/dashboard' })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return <Index />
}
