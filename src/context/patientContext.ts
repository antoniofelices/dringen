import { createContext } from 'react'
import type { PatientWithRelations } from '@/types/interfaces'
import type { Tables } from '@/types/database.types'

interface PatientContextType {
    patientData: PatientWithRelations | null
    patientHistory: Tables<'medical_patient_history'> | null
    clinicalHistory: Tables<'medical_clinical_history'>[] | null
    patientLoading: boolean
    patientError: boolean
    patientErrorType: Error | null
    refetchPatient: () => void
}
export const PatientContext = createContext<PatientContextType | undefined>(
    undefined
)
