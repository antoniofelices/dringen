import type { LucideIcon } from 'lucide-react'
import type { Database, Tables, TablesInsert } from '@/types/database.types'

export type RoutesProps = {
    id: number
    icon?: LucideIcon
    url: string
    text: string
    orderMenu?: number
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

export type UserRoleType = Database['public']['Enums']['dn_user_role']

export type MedicalUserDataType =
    Database['public']['Tables']['medical_user']['Row']
