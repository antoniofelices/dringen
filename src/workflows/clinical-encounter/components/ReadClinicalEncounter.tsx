import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@shared/components/ui/base/tabs'
import { useReadClinicalEncounter } from '@workflows/clinical-encounter/hooks/useReadClinicalEncounter'
import ReadObservationTab from './tabs/ReadObservationTab'
import ReadConditionTab from './tabs/ReadConditionTab'
import ReadServiceRequestTab from './tabs/ReadServiceRequestTab'
import ReadMedicationRequestTab from './tabs/ReadMedicationRequestTab'
import content from './ReadClinicalEncounter.content'

const ReadClinicalEncounter = ({ encounterId }: { encounterId: string }) => {
    const { data, loading, error } = useReadClinicalEncounter(encounterId)

    if (loading) {
        return <p className="text-sm text-gray-500">{content.textLoading}</p>
    }

    if (error || !data) {
        return <p className="text-sm text-red-500">{content.textError}</p>
    }

    return (
        <Tabs aria-label="Encounter" defaultValue="observation">
            <TabsList>
                <TabsTrigger value="observation">
                    {content.textObservation}
                </TabsTrigger>
                <TabsTrigger value="condition">
                    {content.textCondition}
                </TabsTrigger>
                <TabsTrigger value="service-request">
                    {content.textServiceRequest}
                </TabsTrigger>
                <TabsTrigger value="medication-request">
                    {content.textMedicationRequest}
                </TabsTrigger>
            </TabsList>
            <div className="mt-4">
                <TabsContent value="observation">
                    <ReadObservationTab observations={data.observations} />
                </TabsContent>
                <TabsContent value="condition">
                    <ReadConditionTab conditions={data.conditions} />
                </TabsContent>
                <TabsContent value="service-request">
                    <ReadServiceRequestTab
                        serviceRequests={data.serviceRequests}
                    />
                </TabsContent>
                <TabsContent value="medication-request">
                    <ReadMedicationRequestTab
                        medicationRequests={data.medicationRequests}
                    />
                </TabsContent>
            </div>
        </Tabs>
    )
}

export default ReadClinicalEncounter
