import { useState, useMemo, useCallback } from 'react'
import { usePractitionerDetails } from '@resources/practitioner/hooks/usePractitionerDetails'
import { useAvailableSlots } from '@workflows/clinical-appointment/hooks/useAvailableSlots'
import { DAYS_VISIBLE } from '@workflows/clinical-appointment/config/config'
import { addDays } from '@workflows/clinical-appointment/utils/clinicalAppointment.utils'
import type { SelectedSlot } from '@workflows/clinical-appointment/types/clinicalAppointment.model'

export const useAppointmentSelector = (practitionerId: string) => {
    const { availableTime } = usePractitionerDetails(practitionerId)
    const { today, availMap, slots } = useAvailableSlots(availableTime)

    const [weekOffset, setWeekOffset] = useState(0)
    const [selected, setSelected] = useState<SelectedSlot>(null)
    const [calMonth, setCalMonth] = useState(
        () => new Date(today.getFullYear(), today.getMonth(), 1)
    )

    const visibleDays = useMemo(
        () =>
            Array.from({ length: DAYS_VISIBLE }, (_, i) =>
                addDays(today, weekOffset * DAYS_VISIBLE + i)
            ),
        [today, weekOffset]
    )

    const handleCalDayClick = useCallback(
        (d: Date) => {
            const daysDiff = Math.floor(
                (d.getTime() - today.getTime()) / 86400000
            )
            setWeekOffset(Math.floor(daysDiff / DAYS_VISIBLE))
        },
        [today]
    )

    const handlePrevWeek = useCallback(() => {
        setWeekOffset((o) => Math.max(0, o - 1))
    }, [])

    const handleNextWeek = useCallback(() => {
        setWeekOffset((o) => o + 1)
    }, [])

    const handleSlotClick = useCallback(
        (date: Date, slot: string, isSelected: boolean) => {
            setSelected(isSelected ? null : { date, slot })
        },
        []
    )

    const handleCancel = useCallback(() => {
        setSelected(null)
    }, [])

    return {
        today,
        availMap,
        slots,
        weekOffset,
        selected,
        calMonth,
        setCalMonth,
        visibleDays,
        handleCalDayClick,
        handlePrevWeek,
        handleNextWeek,
        handleSlotClick,
        handleCancel,
    }
}
