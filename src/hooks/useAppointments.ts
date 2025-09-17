import { useQuery } from '@tanstack/react-query'
import { getAppointments } from '@services/supabaseService'

export const useAppointments = () => {
    const {
        data: appointmentData,
        isPending: appointmentLoading,
        isError: appointmentError,
        error: appointmentErrorType,
        refetch: appointmentRefetch,
    } = useQuery({
        queryKey: ['listAppointments'],
        queryFn: () => getAppointments(),
    })

    return {
        appointments: appointmentData,
        isPending: appointmentLoading,
        isError: appointmentError,
        error: appointmentErrorType,
        refetch: appointmentRefetch,
    }
}
