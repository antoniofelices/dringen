import type { z } from 'zod'
import type { addNewCommunicationSchema } from '@resources/communication/schemas/addNewCommunication.schema'

export type CommunicationType = {
    id: string
    title: string
    content: string
    startDate: string
    endDate: string
    location: string
    sent: string
}

export type CommunicationPayloadType = {
    title: string
    content: string
    startDate: string
    endDate: string
    location: string
}

export type AddNewCommunicationType = z.infer<typeof addNewCommunicationSchema>

export type AddNewCommunicationFormProps = {
    onSuccess?: () => void
}

export type CreateCommunicationParams = {
    formData: AddNewCommunicationType
    sender: { id: string; displayName: string }
}
