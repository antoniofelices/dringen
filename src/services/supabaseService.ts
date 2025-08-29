import { createClient } from '@supabase/supabase-js'
import { SUPABASEURL, SUPABASEANONKEY } from '@/config/config'
import type { AuthResponse } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'
import type { PatientWithRelationsType } from '@/types/interfaces'

export const supabase = createClient<Database>(SUPABASEURL!, SUPABASEANONKEY!)

// Patients
export const getListPatients = async () => {
    const { data, error } = await supabase.from('medical_patient').select('*')
    if (error) throw error
    return data
}

// export const getSinglePatient = async (
//     id: string
// ): Promise<PatientWithRelationsType> => {
//     const { data, error } = await supabase
//         .from('medical_patient')
//         .select(
//             `
//       *,
//       medical_clinical_history(
//         id,
//         additional_tests,
//         bfp,
//         created_at,
//         eating,
//         examination,
//         fc,
//         feces,
//         fr,
//         gfp,
//         imc,
//         mmp,
//         mood,
//         oximetry,
//         pad,
//         pas,
//         patient_id,
//         person_height,
//         person_weight,
//         sleep,
//         temperature,
//         test,
//         thirst,
//         treatment,
//         type_of,
//         updated_at,
//         urine,
//         waist,
//         medical_diagnosis(
//           id,
//           certainty,
//           cie10,
//           clinical_history_id,
//           created_at,
//           diagnosis,
//           updated_at
//         )
//       ),
//       medical_patient_history(
//         id,
//         created_at,
//         family_history,
//         past_medical_history,
//         patient_id,
//         social_history,
//         updated_at
//       )
//     `
//         )
//         .eq('id', id)
//         .single()
//     if (error) throw error
//     return data
// }

export const getSinglePatient = async (
    id: string
): Promise<PatientWithRelationsType> => {
    if (!id) {
        throw new Error('Patient ID is required')
    }

    const { data, error } = await supabase
        .from('medical_patient')
        .select(
            `
      *,
      medical_clinical_history(
        *,
        medical_diagnosis(*)
      ),
      medical_patient_history(*)
    `
        )
        .eq('id', id)
        .single()

    if (error) {
        throw new Error(`Failed to fetch patient: ${error.message}`)
    }

    const transformedData: PatientWithRelationsType = {
        ...data,
        medical_clinical_history: (data.medical_clinical_history || []).map(
            (history) => ({
                ...history,
                medical_diagnosis: history.medical_diagnosis || [],
            })
        ),
        medical_patient_history: data.medical_patient_history || null,
    }

    return transformedData
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
