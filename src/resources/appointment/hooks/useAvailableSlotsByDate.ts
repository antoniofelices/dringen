import { useQuery } from '@tanstack/react-query'
import { usePractitionerDetails } from '@resources/practitioner/hooks/usePractitionerDetails'
import { useAvailableSlots } from '@resources/appointment/hooks/useAvailableSlots'
import { getAppointmentsByPractitioner } from '@resources/appointment/services/bookAppointment'
import { getKey } from '@resources/appointment/utils/clinicalAppointment.utils'

export const useAvailableSlotsByDate = (physicianId: string, date: Date) => {
    const { availableTime } = usePractitionerDetails(physicianId)

    const { data: appointments = [] } = useQuery({
        queryKey: ['appointments', physicianId],
        queryFn: () => getAppointmentsByPractitioner(physicianId),
        enabled: !!physicianId,
    })

    const { availMap } = useAvailableSlots(availableTime, appointments)

    const daySlots = availMap[getKey(date)] ?? {}

    return Object.entries(daySlots)
        .filter(([, available]) => available)
        .map(([time]) => time)
        .sort()
}
