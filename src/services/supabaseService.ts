import { createClient } from '@supabase/supabase-js'
import { SUPABASEURL, SUPABASEANONKEY } from '@/config/config'
import type { AuthResponse, UserResponse } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'
import type {
    PatientWithRelationsType,
    FileUploadValidationResult,
} from '@/types/interfaces'
import type { Enums } from '@/types/database.types'

export const supabase = createClient<Database>(SUPABASEURL!, SUPABASEANONKEY!)

// Patients
export const getListPatients = async () => {
    const { data, error } = await supabase.from('medical_patient').select('*')
    if (error) throw error
    return data
}

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
    const insertData = {
        user_name: userName,
        user_last_name: userLastName,
        dni: dni,
        email: email,
        ...(phone && { phone }),
        ...(placeOfResidence && { place_of_residence: placeOfResidence }),
    }

    const { data, error } = await supabase
        .from('medical_patient')
        .insert([insertData])
        .select()
    if (error) throw error
    return data
}

export const updateHistoryPatient = async (
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

export const updateGeneralDataPatient = async (
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

// Clinical History
export const getListAllClinicalHistory = async () => {
    const { data, error } = await supabase
        .from('medical_clinical_history')
        .select('*')
    if (error) throw error
    return data
}

export const registerClinicalHistory = async (
    patientId?: string,
    type_of?: string,
    examination?: string,
    mood?: string,
    test?: string,
    temperature?: number,
    pas?: number,
    pad?: number,
    fc?: number,
    fr?: number,
    oximetry?: number,
    eating?: string,
    thirst?: string,
    urine?: string,
    feces?: string,
    sleep?: string,
    person_weight?: number,
    person_height?: number,
    imc?: number,
    waist?: number,
    bfp?: number,
    mmp?: number,
    gfp?: number,
    additional_tests?: string,
    treatment?: string
) => {
    if (!patientId) throw new Error('ID is required')

    const { data, error } = await supabase
        .from('medical_clinical_history')
        .insert([
            {
                patient_id: patientId,
                type_of: type_of,
                examination: examination,
                mood: mood,
                test: test,
                temperature: temperature,
                pas: pas,
                pad: pad,
                fc: fc,
                fr: fr,
                oximetry: oximetry,
                eating: eating,
                thirst: thirst,
                urine: urine,
                feces: feces,
                sleep: sleep,
                person_weight: person_weight,
                person_height: person_height,
                imc: imc,
                waist: waist,
                bfp: bfp,
                mmp: mmp,
                gfp: gfp,
                additional_tests: additional_tests,
                treatment: treatment,
            },
        ])
        .select()
        .single()
    if (error) throw error
    return data
}

export const registerDiagnosis = async (
    clinical_history_id: string,
    diagnoses: {
        cie10?: string | null
        diagnosis?: string | null
        certainty?: Enums<'dn_diagnosis_certainty'>
    }[]
) => {
    if (!clinical_history_id) throw new Error('Clinical history ID is required')
    if (!diagnoses || diagnoses.length === 0)
        throw new Error('At least one diagnosis is required')

    const diagnosisRecords = diagnoses.map((diagnosis) => ({
        clinical_history_id,
        cie10: diagnosis.cie10,
        diagnosis: diagnosis.diagnosis,
        certainty:
            diagnosis.certainty ||
            ('suspected' as Enums<'dn_diagnosis_certainty'>),
    }))

    const { data, error } = await supabase
        .from('medical_diagnosis')
        .insert(diagnosisRecords)
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

export const updateAccountUser = async (
    id: string,
    userName?: string,
    userLastName?: string,
    email?: string
) => {
    const { data, error } = await supabase
        .from('medical_user')
        .update({
            user_name: userName,
            user_last_name: userLastName,
            email: email,
        })
        .eq('id', id)
        .select()
    if (error) throw error
    return data
}

export const resetPasswordUser = async (
    password: string
): Promise<UserResponse> => {
    return await supabase.auth.updateUser({
        password: password,
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

// Upload files
export const uploadFiles = async (
    patientDni: string,
    fileName: string,
    file: File
) => {
    const { data: validationResult, error: validationError } =
        await supabase.rpc('validate_medical_file_upload', {
            patient_dni_param: patientDni,
            file_name: fileName,
        })

    if (validationError) throw validationError
    if (!(validationResult as unknown as FileUploadValidationResult)?.success) {
        throw new Error('Upload validation failed')
    }

    const storagePath =
        (validationResult as unknown as FileUploadValidationResult)?.path ?? ''

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('medical-files')
        .upload(storagePath, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type,
        })

    if (uploadError) {
        if (uploadError.message.includes('already exists')) {
            throw new Error(
                'There is already a file with that name for this patient'
            )
        }
        throw uploadError
    }

    return {
        id: uploadData.id,
        path: uploadData.path,
        fullPath: uploadData.fullPath,
        message: 'File uploaded successfully',
    }
}

export const getPatientFiles = async (patientDni: string) => {
    const { data, error } = await supabase.rpc('get_patient_files', {
        patient_dni_param: patientDni,
    })
    if (error) throw error
    return data
}

export const canUploadFiles = async (patientDni: string) => {
    const { data, error } = await supabase.rpc('can_upload_medical_file', {
        patient_dni_param: patientDni,
    })
    if (error) throw error
    return data
}

export const getFileDownloadUrl = async (filePath: string) => {
    const { data, error } = await supabase.storage
        .from('medical-files')
        .createSignedUrl(filePath, 3600)

    if (error) throw error
    return data.signedUrl
}
