import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '@/services/supabaseService'
import Header from '@layouts/Header'
import Footer from '@/layouts/Footer'

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
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
