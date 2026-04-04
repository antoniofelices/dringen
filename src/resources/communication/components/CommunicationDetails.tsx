import { Minus } from 'lucide-react'
import { transformDateTime } from '@shared/utils/utils'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '@shared/components/ui/base/alert'
import { useCommunicationDetails } from '@resources/communication/hooks/useCommunicationDetails'
import content from './CommunicationDetails.content'

const CommunicationDetails = () => {
    const { visibleCommunications } = useCommunicationDetails()

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2 className="font-extrabold">{content.title}</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {visibleCommunications.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            {content.textEmpty}
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {visibleCommunications.map((comm) => (
                                <Alert key={comm.id}>
                                    <Minus size="12" />
                                    <AlertTitle>{comm.title}</AlertTitle>
                                    <AlertDescription>
                                        <div>{comm.content}</div>
                                        <div>
                                            <ul>
                                                <li>
                                                    {content.textStartDate}:{' '}
                                                    {transformDateTime(
                                                        comm.startDate
                                                    )}
                                                </li>
                                                <li>
                                                    {content.textEndDate}:{' '}
                                                    {transformDateTime(
                                                        comm.endDate
                                                    )}
                                                </li>
                                                <li>
                                                    {content.textLocation}:{' '}
                                                    {comm.location}
                                                </li>
                                            </ul>
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    )
}

export default CommunicationDetails
