import { ChevronDownIcon } from 'lucide-react'
import { transformDateTime } from '@shared/utils/utils'
import { Button } from '@shared/components/ui/base/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@shared/components/ui/base/collapsible'
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
                        <div className="space-y-4">
                            {visibleCommunications.map((comm) => (
                                <Collapsible
                                    className="rounded-md data-[state=open]:bg-muted"
                                    key={comm.id}
                                >
                                    <CollapsibleTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="group w-full p-8"
                                        >
                                            <div className="flex flex-col items-start gap-1">
                                                <span>{comm.title}</span>
                                                <span>
                                                    {transformDateTime(
                                                        comm.startDate
                                                    )}
                                                </span>
                                            </div>
                                            <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="flex flex-col items-start gap-2 p-4 text-sm">
                                        <>
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
                                        </>
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    )
}

export default CommunicationDetails
