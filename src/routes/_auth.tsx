import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '@/services/supabaseAuthService'
import Header from '@layouts/Header'
import Aside from '@layouts/Aside'

export const Route = createFileRoute('/_auth')({
    beforeLoad: async () => {
        const { data } = await supabase.auth.getSession()
        if (!data.session) {
            throw redirect({ to: '/sign-in' })
        }
    },
    component: AuthLayout,
})

function AuthLayout() {
    return (
        <div className="antialiase">
            <Header />
            <Aside />
            <main className="p-4 md:ml-64 h-auto pt-20">
                <Outlet />
            </main>
        </div>
    )
}
