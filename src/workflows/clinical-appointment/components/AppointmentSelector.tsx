import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import ConfirmationBar from '@workflows/clinical-appointment/components/ConfirmationBar'
import MiniCalendar from '@workflows/clinical-appointment/components/MiniCalendar'
import content from './AppointmentSelector.content'

const AppointmentSelector = () => {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ConfirmationBar />
                <MiniCalendar />
            </CardContent>
        </Card>
    )
}

export default AppointmentSelector
