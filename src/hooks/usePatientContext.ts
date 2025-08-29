import { useContext } from 'react'
import { PatientContext } from '@/context/patientContext'

export const usePatientContext = () => {
    const context = useContext(PatientContext)
    if (!context) {
        throw new Error('usePatient must be used within a PatientProvider')
    }
    return context
}
