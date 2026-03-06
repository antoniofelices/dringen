import type { z } from 'zod'
import type { bookAppointmentSchema } from '@workflows/clinical-appointment/schemas/bookAppointment.schema'

export type BookAppointmentFormType = z.infer<typeof bookAppointmentSchema>

export type SelectedSlot = {
    date: Date
    slot: string
} | null

export type AvailabilityMap = Record<string, Record<string, boolean>>

export type ConfirmationBarProps = {
    selected: SelectedSlot
    practitionerId: string
    onCancel: () => void
}

export type MiniCalendarProps = {
    today: Date
    calMonth: Date
    setCalMonth: React.Dispatch<React.SetStateAction<Date>>
    visibleDays: Date[]
    availMap: AvailabilityMap
    onDayClick: (date: Date) => void
}
