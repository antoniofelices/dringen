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
    const { data, error } = await supabase
        .from('dn_health_consumer')
        .select('*')
    if (error) throw error
    return data
}

export const getSingleHealthConsumer = async (id: string) => {
    const { data, error } = await supabase
        .from('dn_health_consumer')
        .select(`*, dn_pfsh("*"), dn_hpi("*")`)
        .eq('id', id)
    if (error) throw error
    return data[0]
}

export const getDiagnosis = async (id: string) => {
    const { data, error } = await supabase
        .from('dn_hpi')
        .select(`id, dn_hpi_diagnosis("*")`)
        .eq('id', id)
    if (error) throw error
    return data[0]
}

export const getListUsers = async () => {
    const { data, error } = await supabase.from('dn_users').select('*')
    if (error) throw error
    return data
}

export const getSingleUser = async (id: string) => {
    const { data, error } = await supabase
        .from('dn_users')
        .select('*')
        .eq('id', id)
    if (error) throw error
    return data[0]
}
