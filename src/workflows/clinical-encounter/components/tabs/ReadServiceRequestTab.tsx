import type { ServiceRequest } from '@medplum/fhirtypes'
import content from './ReadServiceRequestTab.content'

const ReadServiceRequestTab = ({
    serviceRequests,
}: {
    serviceRequests: ServiceRequest[]
}) => {
    const notes = serviceRequests
        .flatMap((sr) => sr.note ?? [])
        .map((n) => n.text)
        .filter(Boolean)
        .join('\n')

    return (
        <div>
            <label className="text-sm font-medium">
                {content.labelAdditionalTests}
            </label>
            <p className="text-sm mt-1 whitespace-pre-wrap">
                {notes || content.textNoData}
            </p>
        </div>
    )
}

export default ReadServiceRequestTab
