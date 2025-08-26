import { createClient } from '@supabase/supabase-js'
import { SUPABASEURL, SUPABASEANONKEY } from '@/config/config'
import type { AuthResponse } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

export const supabase = createClient<Database>(SUPABASEURL!, SUPABASEANONKEY!)

export const registerUserOriginal = async (
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
        .single()
    if (error) throw error
    return data
}

export const getDiagnosis = async (id: string) => {
    const { data, error } = await supabase
        .from('dn_hpi')
        .select(`id, dn_hpi_diagnosis("*")`)
        .eq('id', id)
        .single()
    if (error) throw error
    return data
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
        .single()
    if (error) throw error
    return data
}

export const registerHealthConsumer = async (
    userName: string,
    userLastName: string,
    dni: string,
    email: string,
    phone?: string,
    placeOfResidence?: string

    // birthday?: string,
    // gender?: string,
    // birthplace?: string,
    // occupation?: string
) => {
    const { data, error } = await supabase
        .from('dn_health_consumer')
        .insert([
            {
                user_name: userName,
                user_last_name: userLastName,
                dni: dni,
                email: email,
                phone: phone,
                place_of_residence: placeOfResidence,

                // birthday: birthday,
                // gender: gender,
                // birthplace: birthplace,
                // occupation: occupation,
            },
        ])
        .select()
    if (error) throw error
    return data
}
