import { useQuery } from '@tanstack/react-query'
import { PatientContext } from '@/context/patientContext'
import { getSinglePatient } from '@services/supabaseService'

type PatientProviderProps = {
    patientId: string
    children: React.ReactNode
}

const PatientProvider = ({
    patientId,
    children,
    ...props
}: PatientProviderProps) => {
    const {
        data: patientData,
        isPending: patientLoading,
        isError: patientError,
        error: patientErrorType,
        refetch: refetchPatient,
    } = useQuery({
        queryKey: ['singleHealthConsumerQuery', patientId],
        queryFn: () => getSinglePatient(patientId),
        enabled: !!patientId,
    })

    const value = {
        patientData: patientData || null,
        patientHistory: patientData?.medical_patient_history || null,
        clinicalHistory: patientData?.medical_clinical_history || null,
        patientLoading,
        patientError,
        patientErrorType: patientErrorType || null,
        refetchPatient,
    }

    return (
        <PatientContext.Provider {...props} value={value}>
            {children}
        </PatientContext.Provider>
    )
}

export default PatientProvider
