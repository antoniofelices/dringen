import { createContext } from 'react'
import type {
    PatientWithRelationsType,
    ClinicalHistoryWithDiagnosisType,
} from '@/types/interfaces'
import type { Tables } from '@/types/database.types'

interface PatientContextType {
    patientData: PatientWithRelationsType | null
    patientHistory: Tables<'medical_patient_history'> | null
    clinicalHistory: ClinicalHistoryWithDiagnosisType[] | null
    patientLoading: boolean
    patientError: boolean
    patientErrorType: Error | null
    refetchPatient: () => void
}
export const PatientContext = createContext<PatientContextType | undefined>(
    undefined
)
