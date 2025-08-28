import type { LucideIcon } from 'lucide-react'
import type { Tables } from '@/types/database.types'

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

export type Patient = Tables<'medical_patient'>
export type ClinicalHistory = Tables<'medical_clinical_history'>
export type PatientHistory = Tables<'medical_patient_history'>
export type Diagnosis = Tables<'medical_diagnosis'>

export interface ClinicalHistoryWithDiagnosis extends ClinicalHistory {
    medical_diagnosis: Diagnosis[]
}

export interface PatientWithRelations extends Patient {
    medical_clinical_history: ClinicalHistoryWithDiagnosis[]
    medical_patient_history: PatientHistory | null
}
