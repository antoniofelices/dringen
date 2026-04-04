import { Minus } from 'lucide-react'
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
import content from './CommunicationDetails.content'

const CommunicationDetails = ({}) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2 className="font-extrabold">{content.title}</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert>
                        <Minus size="12" />
                        <AlertTitle>Title</AlertTitle>
                        <AlertDescription>
                            <div>Content…</div>
                            <div>
                                <ul>
                                    <li>{content.textStartDate}: startDate</li>
                                    <li>{content.textEndDate}: endDate</li>
                                    <li>{content.textLocation}: location</li>
                                </ul>
                            </div>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </>
    )
}

export default CommunicationDetails
