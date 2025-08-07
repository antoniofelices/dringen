import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '@/services/supabaseService'
import Header from '@layouts/authz/Header'
import Aside from '@layouts/authz/Aside'
import Main from '@/layouts/authz/Main'

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
    return (
        <>
            <Header />
            <Aside />
            <Main>
                <Outlet />
            </Main>
        </>
    )
}
