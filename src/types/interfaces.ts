import type { LucideIcon } from 'lucide-react'

export type RoutesProps = {
    id: number
    icon?: LucideIcon
    url: string
    text: string
    orderMenu?: number
}

export type PatientType = null
export type ClinicalHistoryType = null
export type PatientHistoryType = null
export type DiagnosisType = null
export type UserType = null

export type ClinicalHistoryWithDiagnosisType = null

export type PatientWithRelationsType = null

export type DiagnosisFormData = null

export type ClinicalHistoryFormDataType = null

export type UserRoleType = null

export type FileUploadValidationResult = {
    success: boolean
    path?: string
}

export type PatientFileType = {
    file_id: string
    file_name: string
    file_created_at: string
    file_updated_at: string
    file_metadata: null
}
