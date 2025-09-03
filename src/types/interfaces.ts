import type { LucideIcon } from 'lucide-react'
import type { Tables, TablesInsert } from '@/types/database.types'
// import type { Control } from 'react-hook-form'

export type RoutesProps = {
    id: number
    icon?: LucideIcon
    url: string
    text: string
    orderMenu?: number
}

export type DataTablePatient = {
    id: string
    user_name: string
    user_last_name: string
    dni?: string
}

export type DataTableUser = {
    id: string
    user_name: string
    user_last_name: string
    dni?: string
    role?: string
}

export type PatientType = Tables<'medical_patient'>
export type ClinicalHistoryType = Tables<'medical_clinical_history'>
export type PatientHistoryType = Tables<'medical_patient_history'>
export type DiagnosisType = Tables<'medical_diagnosis'>
export type UserType = Tables<'medical_user'>

export interface ClinicalHistoryWithDiagnosisType extends ClinicalHistoryType {
    medical_diagnosis: DiagnosisType[]
}

export interface PatientWithRelationsType extends PatientType {
    medical_clinical_history: ClinicalHistoryWithDiagnosisType[]
    medical_patient_history: PatientHistoryType | null
}

export type DiagnosisFormData = {
    cie10?: string | null
    diagnosis?: string | null
    certainty?: 'confirmed' | 'probable' | 'suspected'
}

export type ClinicalHistoryFormDataType =
    TablesInsert<'medical_clinical_history'> & {
        diagnoses: DiagnosisFormData[]
    }
