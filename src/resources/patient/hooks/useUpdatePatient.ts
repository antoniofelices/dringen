import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
    getSinglePatientById,
    updatePatient,
} from '@resources/patient/services/patient.service'
import { patientDemographicsToFhir } from '@resources/patient/domain/patient.adapter'
import type { PatientDemographicsFormType } from '@resources/patient/types/patient.model'

export const useUpdatePatientDemographics = (patientId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (formData: PatientDemographicsFormType) => {
            const existingPatient = await getSinglePatientById(patientId)
            const updatedPatient = patientDemographicsToFhir(
                formData,
                existingPatient
            )
            return updatePatient(patientId, updatedPatient)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['singlePatient', patientId],
            })
        },
    })
}
