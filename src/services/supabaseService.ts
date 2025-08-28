import { createClient } from '@supabase/supabase-js'
import { SUPABASEURL, SUPABASEANONKEY } from '@/config/config'
import type { AuthResponse } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

export const supabase = createClient<Database>(SUPABASEURL!, SUPABASEANONKEY!)

// Patients
export const getListPatients = async () => {
    const { data, error } = await supabase.from('medical_patient').select('*')
    if (error) throw error
    return data
}

export const getSinglePatient = async (id: string) => {
    const { data, error } = await supabase
        .from('medical_patient')
        .select(
            `*, medical_clinical_history("*"), medical_patient_history("*")`
        )
        .eq('id', id)
        .single()
    if (error) throw error
    return data
}
export const registerPatient = async (
    userName: string,
    userLastName: string,
    dni: string,
    email: string,
    phone?: string,
    placeOfResidence?: string
) => {
    const { data, error } = await supabase
        .from('medical_patient')
        .insert([
            {
                user_name: userName,
                user_last_name: userLastName,
                dni: dni,
                email: email,
                phone: phone,
                place_of_residence: placeOfResidence,
            },
        ])
        .select()
    if (error) throw error
    return data
}

export const getDiagnosis = async (id: string) => {
    const { data, error } = await supabase
        .from('medical_clinical_history')
        .select(`id, medical_diagnosis("*")`)
        .eq('id', id)
        .single()
    if (error) throw error
    return data
}

export const updateMedicalPatientHistory = async (
    id: string,
    pastMedicalHistory: string,
    familyHistory: string,
    socialHistory: string
) => {
    if (!id) throw new Error('ID is required')

    const { data, error } = await supabase
        .from('medical_patient_history')
        .update({
            past_medical_history: pastMedicalHistory,
            family_history: familyHistory,
            social_history: socialHistory,
        })
        .eq('id', id)
        .select()
    if (error) throw error
    return data
}

export const updateMedicalPatientGeneralData = async (
    id: string,
    birthday?: string | null,
    gender?: string,
    birthplace?: string,
    placeOfResidence?: string,
    occupation?: string
) => {
    if (!id) throw new Error('ID is required')

    const { data, error } = await supabase
        .from('medical_patient')
        .update({
            birthday: birthday,
            gender: gender,
            birthplace: birthplace,
            place_of_residence: placeOfResidence,
            occupation: occupation,
        })
        .eq('id', id)
        .select()
    if (error) throw error
    return data
}

// Users
export const getListUsers = async () => {
    const { data, error } = await supabase.from('medical_user').select('*')
    if (error) throw error
    return data
}

export const getSingleUser = async (id: string) => {
    const { data, error } = await supabase
        .from('medical_user')
        .select('*')
        .eq('id', id)
        .single()
    if (error) throw error
    return data
}
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
