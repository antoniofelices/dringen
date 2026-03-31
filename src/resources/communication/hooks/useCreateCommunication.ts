import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCommunication } from '@resources/communication/services/communication.service'
import { addNewCommunicationToFhir } from '@resources/communication/domain/communication.adapter'
import type { CreateCommunicationParams } from '@resources/communication/types/communication.model'

export const useCreateCommunication = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ formData, sender }: CreateCommunicationParams) =>
            createCommunication(addNewCommunicationToFhir(formData, sender)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['listCommunications'] })
        },
    })
}
