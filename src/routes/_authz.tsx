import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '@/services/supabaseService'
import All from '@layouts/authz/All'

export const Route = createFileRoute('/_authz')({
    beforeLoad: async () => {
        const { data } = await supabase.auth.getSession()
        if (!data.session) {
            throw redirect({ to: '/sign-in' })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return <All />
}
