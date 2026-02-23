import type { MedicationRequest } from '@medplum/fhirtypes'
import content from './ReadMedicationRequestTab.content'

const ReadMedicationRequestTab = ({
    medicationRequests,
}: {
    medicationRequests: MedicationRequest[]
}) => {
    const notes = medicationRequests
        .flatMap((mr) => mr.note ?? [])
        .map((n) => n.text)
        .filter(Boolean)
        .join('\n')

    return (
        <div>
            <label className="text-sm font-medium">
                {content.labelTreatment}
            </label>
            <p className="text-sm mt-1 whitespace-pre-wrap">
                {notes || content.textNoData}
            </p>
        </div>
    )
}

export default ReadMedicationRequestTab
