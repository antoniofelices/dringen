import type { z } from 'zod'
import type { bookAppointmentSchema } from '@resources/appointment/schemas/bookAppointment.schema'
import type { addNewAppointmentSchema } from '@resources/appointment/schemas/addNewAppointment.schema'

export type BookAppointmentFormType = z.infer<typeof bookAppointmentSchema>
export type AddNewAppointmentType = z.infer<typeof addNewAppointmentSchema>

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

export type SlotsButtonsProps = {
    availMap: AvailabilityMap
    slots: string[]
    weekOffset: number
    selected: SelectedSlot
    visibleDays: Date[]
    handlePrevWeek: () => void
    handleNextWeek: () => void
    handleSlotClick: (date: Date, slot: string, isSelected: boolean) => void
}

export type AppointmentType = {
    id: string
    status: string
    start: string
    end: string
    patientId: string
    patientName: string
    patientPhone: string
    practitionerId: string
    practitionerName: string
    notes: string
    called: boolean
}

export type UseAddNewAppointmentFormProps = {
    initialDate?: Date | null
    onSuccess?: () => void
}
