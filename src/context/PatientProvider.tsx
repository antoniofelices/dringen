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

    const clinicalHistoryNutritional =
        patientData?.medical_clinical_history
            .filter(
                (item) =>
                    item.person_weight != null && item.type_of === 'nutricional'
            )
            .map((item) => ({
                date: item.created_at || '',
                weight: item.person_weight || 0,
            })) || null

    const value = {
        patientData: patientData || null,
        patientHistory: patientData?.medical_patient_history || null,
        clinicalHistory: patientData?.medical_clinical_history || null,
        clinicalHistoryNutritional: clinicalHistoryNutritional || null,
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
