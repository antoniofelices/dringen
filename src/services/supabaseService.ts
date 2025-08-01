import { createClient } from '@supabase/supabase-js'
import { SUPABASEURL, SUPABASEANONKEY } from '@/config/config'
import type { Database } from '@/types/database.types'

export const supabase = createClient<Database>(SUPABASEURL!, SUPABASEANONKEY!)

export const registerUser = async (
    email: string,
    password: string,
    username: string
): Promise<AuthResponse> => {
    return await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username },
        },
    })
}

export const signInWithPassword = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    return await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
}

export const getListHealthConsumer = async () => {
    const { data, error } = await supabase.from('profiles').select('*')
    if (error) throw error
    return data
}

export const getSingleHealthConsumer = async (id: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select(`*, pfsh("*"), hpi("*")`)
        .eq('id', id)
    if (error) throw error
    return data[0]
}
