import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import { useAppointmentSelector } from '@workflows/clinical-appointment/hooks/useAppointmentSelector'
import { DAYS_VISIBLE, DAYS } from '@workflows/clinical-appointment/config/config'
import ConfirmationBar from '@workflows/clinical-appointment/components/ConfirmationBar'
import MiniCalendar from '@workflows/clinical-appointment/components/MiniCalendar'
import {
    isSameDay,
    getKey,
} from '@workflows/clinical-appointment/utils/clinicalAppointment.utils'
import content from './AppointmentSelector.content'

const AppointmentSelector = ({
    practitionerId,
}: {
    practitionerId: string
}) => {
    const {
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
    } = useAppointmentSelector(practitionerId)

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-5 items-start">
                    <MiniCalendar
                        today={today}
                        calMonth={calMonth}
                        setCalMonth={setCalMonth}
                        visibleDays={visibleDays}
                        availMap={availMap}
                        onDayClick={handleCalDayClick}
                    />

                    <div className="flex-1 min-w-0 border border-gray-200 dark:border-gray-800 rounded-xl p-5 overflow-x-auto">
                        <div className="flex items-center gap-2 mb-4">
                            <button
                                onClick={handlePrevWeek}
                                disabled={weekOffset === 0}
                                className="text-lg px-1 disabled:opacity-30"
                            >
                                &lsaquo;
                            </button>

                            <div
                                className="flex-1 grid"
                                style={{
                                    gridTemplateColumns: `repeat(${DAYS_VISIBLE}, 1fr)`,
                                }}
                            >
                                {visibleDays.map((d, i) => {
                                    const key = getKey(d)
                                    const hasAny = Object.values(
                                        availMap[key] ?? {}
                                    ).some((v) => v)
                                    return (
                                        <div key={i} className="text-center">
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                {DAYS[d.getDay()]}
                                            </div>
                                            <div
                                                className={
                                                    hasAny
                                                        ? ''
                                                        : 'text-gray-300 dark:text-gray-700'
                                                }
                                            >
                                                {d.getDate()}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <button
                                onClick={handleNextWeek}
                                className="text-lg px-1"
                            >
                                &rsaquo;
                            </button>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-800 mb-2" />

                        <div className="space-y-2">
                            {slots.map((slot) => {
                                const isHour = slot.endsWith(':00')
                                return (
                                    <div
                                        key={slot}
                                        className="grid items-center gap-1"
                                        style={{
                                            gridTemplateColumns: `36px repeat(${DAYS_VISIBLE}, 1fr)`,
                                        }}
                                    >
                                        <span
                                            className={`text-right pr-2 text-xs select-none ${
                                                isHour
                                                    ? 'text-gray-400 dark:text-gray-500'
                                                    : 'invisible'
                                            }`}
                                        >
                                            {slot}
                                        </span>

                                        {visibleDays.map((date) => {
                                            const key = getKey(date)
                                            const avail = availMap[key]?.[slot]
                                            const sel =
                                                selected &&
                                                isSameDay(
                                                    selected.date,
                                                    date
                                                ) &&
                                                selected.slot === slot

                                            return (
                                                <div
                                                    key={key + slot}
                                                    className="flex justify-center px-0.5"
                                                >
                                                    {avail ? (
                                                        <button
                                                            onClick={() =>
                                                                handleSlotClick(
                                                                    date,
                                                                    slot,
                                                                    !!sel
                                                                )
                                                            }
                                                            className={[
                                                                'w-full py-1.5 rounded-full text-xs font-medium transition-all duration-150 border',
                                                                sel
                                                                    ? 'bg-gray-900 text-white border-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:border-gray-50'
                                                                    : 'bg-transparent border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900',
                                                            ].join(' ')}
                                                        >
                                                            {slot}
                                                        </button>
                                                    ) : (
                                                        <span className="w-full text-center text-gray-300 dark:text-gray-700 text-sm">
                                                            &mdash;
                                                        </span>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <ConfirmationBar
                    selected={selected}
                    practitionerId={practitionerId}
                    onCancel={handleCancel}
                />
            </CardContent>
        </Card>
    )
}

export default AppointmentSelector
