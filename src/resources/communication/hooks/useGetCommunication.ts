import { useQuery } from '@tanstack/react-query'
import { getListCommunications } from '@resources/communication/services/communication.service'
import { fhirToCommunication } from '@resources/communication/domain/communication.adapter'
import type { CommunicationType } from '@resources/communication/types/communication.model'

export const useSingleCommunication = () => {
    return
}

export const useCommunications = () => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['listCommunications'],
        queryFn: () => getListCommunications(),
        select: (data) =>
            data
                .map(fhirToCommunication)
                .filter((c): c is CommunicationType => c !== null),
    })

    return {
        communications: data,
        isPending,
        isError,
        error,
    }
}
