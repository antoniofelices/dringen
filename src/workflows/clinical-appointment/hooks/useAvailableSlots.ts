import { useMemo } from 'react'
import type { Appointment } from '@medplum/fhirtypes'
import type { AvailableTimeType } from '@shared/fhir/availableTime.model'
import type { AvailabilityMap } from '@workflows/clinical-appointment/types/clinicalAppointment.model'
import {
    SLOT_INTERVAL,
    DAYS_AHEAD,
    JS_DAY_TO_FHIR,
} from '@workflows/clinical-appointment/config/config'
import { addDays, getKey } from '@workflows/clinical-appointment/utils/clinicalAppointment.utils'

function buildAvailabilityMap(
    availableTime: AvailableTimeType[],
    today: Date,
    slotInterval: number
): AvailabilityMap {
    const map: AvailabilityMap = {}

    for (let i = 0; i < DAYS_AHEAD; i++) {
        const date = addDays(today, i)
        const key = getKey(date)
        const dayCode = JS_DAY_TO_FHIR[date.getDay()]

        map[key] = {}

        const dayEntries = availableTime.filter((at) =>
            at.daysOfWeek.split(', ').includes(dayCode)
        )

        if (dayEntries.length === 0) continue

        for (const entry of dayEntries) {
            const [startH, startM] = entry.startTime.split(':').map(Number)
            const [endH, endM] = entry.endTime.split(':').map(Number)

            let h = startH
            let m = startM

            while (h < endH || (h === endH && m < endM)) {
                const slot = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
                map[key][slot] = true
                m += slotInterval
                if (m >= 60) {
                    h++
                    m -= 60
                }
            }
        }
    }

    return map
}

function markBookedSlots(
    availMap: AvailabilityMap,
    appointments: Appointment[]
): AvailabilityMap {
    const result: AvailabilityMap = {}

    for (const [dayKey, daySlots] of Object.entries(availMap)) {
        result[dayKey] = { ...daySlots }
    }

    for (const appt of appointments) {
        if (!appt.start) continue

        const startDate = new Date(appt.start)
        const key = getKey(startDate)
        const slot = `${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}`

        if (result[key]?.[slot] !== undefined) {
            result[key][slot] = false
        }
    }

    return result
}

function getAllSlots(availMap: AvailabilityMap): string[] {
    const slotSet = new Set<string>()
    for (const daySlots of Object.values(availMap)) {
        for (const slot of Object.keys(daySlots)) {
            slotSet.add(slot)
        }
    }
    return Array.from(slotSet).sort()
}

export const useAvailableSlots = (
    availableTime: AvailableTimeType[],
    appointments: Appointment[]
) => {
    const today = useMemo(() => {
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        return d
    }, [])

    const availMap = useMemo(() => {
        const baseMap = buildAvailabilityMap(availableTime, today, SLOT_INTERVAL)
        return markBookedSlots(baseMap, appointments)
    }, [availableTime, today, appointments])

    const slots = useMemo(() => getAllSlots(availMap), [availMap])

    return { today, availMap, slots }
}
