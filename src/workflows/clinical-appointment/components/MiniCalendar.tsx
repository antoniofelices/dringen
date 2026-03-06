import { useMemo } from 'react'
import { MONTHS } from '@workflows/clinical-appointment/config/config'
import type { MiniCalendarProps } from '@workflows/clinical-appointment/types/clinicalAppointment.model'
import {
    isSameDay,
    getKey,
} from '@workflows/clinical-appointment/utils/clinicalAppointment.utils'
import content from './MiniCalendar.content'

const MiniCalendar = ({
    today,
    calMonth,
    setCalMonth,
    visibleDays,
    availMap,
    onDayClick,
}: MiniCalendarProps) => {
    const calDays = useMemo(() => {
        const [y, mo] = [calMonth.getFullYear(), calMonth.getMonth()]
        const firstDay = new Date(y, mo, 1).getDay()
        const daysInMonth = new Date(y, mo + 1, 0).getDate()
        const cells: (Date | null)[] = Array.from(
            { length: (firstDay + 6) % 7 },
            () => null
        )
        for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, mo, d))
        return cells
    }, [calMonth])

    const isInVisibleWeek = (d: Date | null) =>
        d !== null && visibleDays.some((vd) => isSameDay(vd, d))

    const isCalAvail = (d: Date | null) => {
        if (!d || d < today) return false
        const key = getKey(d)
        // const key = d.toISOString().split('T')[0]
        return availMap[key] && Object.values(availMap[key]).some((v) => v)
    }

    return (
        <div className="w-52 shrink-0 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">
                    {MONTHS[calMonth.getMonth()].slice(0, 3)}{' '}
                    {calMonth.getFullYear()}
                </span>
                <div className="flex">
                    {[-1, 1].map((dir, i) => (
                        <button
                            key={i}
                            onClick={() =>
                                setCalMonth(
                                    (m) =>
                                        new Date(
                                            m.getFullYear(),
                                            m.getMonth() + dir,
                                            1
                                        )
                                )
                            }
                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-base leading-none"
                        >
                            {dir < 0 ? '\u2039' : '\u203A'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-7 mb-1">
                {content.daysLetters.map((d, i) => (
                    <span
                        key={i}
                        className="text-center text-xs font-semibold tracking-wider py-1 text-gray-500 dark:text-gray-400"
                    >
                        {d}
                    </span>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {calDays.map((d, i) => {
                    const avail = isCalAvail(d)
                    const inWeek = isInVisibleWeek(d)
                    const isToday = d !== null && isSameDay(d, today)
                    const past = d !== null && d < today

                    return (
                        <button
                            key={i}
                            onClick={() => avail && d && onDayClick(d)}
                            disabled={!avail}
                            className={[
                                'mx-auto w-5 h-5 my-0.5 rounded-full flex items-center justify-center text-xs transition-all duration-100',
                                !d ? 'invisible' : '',
                                past
                                    ? 'text-gray-300 dark:text-gray-700 cursor-default'
                                    : '',
                                isToday
                                    ? 'bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900 font-bold'
                                    : '',
                                inWeek && !isToday
                                    ? 'bg-gray-100 dark:bg-gray-800 font-semibold ring-1 ring-gray-300 dark:ring-gray-600'
                                    : '',
                                avail && !isToday && !inWeek
                                    ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
                                    : '',
                                !avail && !past && d
                                    ? 'text-gray-300 dark:text-gray-700 cursor-default'
                                    : '',
                            ].join(' ')}
                        >
                            {d ? d.getDate() : ''}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default MiniCalendar
