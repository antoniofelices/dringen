import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPatient } from '@resources/patient/services/patient.service'
import { patientToFhir } from '@resources/patient/domain/patient.adapter'
import type { AddNewPatientType } from '@resources/patient/types/patient.model'

export const useCreatePatient = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (formData: AddNewPatientType) =>
            createPatient(patientToFhir(formData)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['listPatients'] })
        },
    })
}
