import { useCommunications } from '@resources/communication/hooks/useGetCommunication'

export const useCommunicationDetails = () => {
    const { communications, isPending, isError, error } = useCommunications()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const visibleCommunications = (communications ?? []).filter((comm) => {
        const endDate = new Date(comm.endDate)
        return endDate >= today
    })

    return { visibleCommunications, isPending, isError, error }
}
