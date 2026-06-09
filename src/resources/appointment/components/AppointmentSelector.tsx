import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import { useAppointmentSelector } from '@resources/appointment/hooks/useAppointmentSelector'
import ConfirmationBar from '@resources/appointment/components/ConfirmationBar'
import MiniCalendar from '@resources/appointment/components/MiniCalendar'
import SlotsButtons from '@resources/appointment/components/SlotsButtons'
import { contentES as content } from './AppointmentSelector.content'

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
                    <h2 className="font-bold text-gray-700 dark:text-gray-300">{content.title}</h2>
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
                    <SlotsButtons
                        availMap={availMap}
                        slots={slots}
                        weekOffset={weekOffset}
                        selected={selected}
                        visibleDays={visibleDays}
                        handlePrevWeek={handlePrevWeek}
                        handleNextWeek={handleNextWeek}
                        handleSlotClick={handleSlotClick}
                    />
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
