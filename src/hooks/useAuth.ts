import { useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/services/supabaseService'

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getInitialSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
            setLoading(false)
        }

        getInitialSession()

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    return { user, loading, isLoggedIn: !!user }
}
