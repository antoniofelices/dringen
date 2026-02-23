import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@shared/components/ui/base/tabs'
import { useClinicalEncounter } from '@workflows/clinical-encounter/hooks/useClinicalEncounter'
import ObservationTab from './tabs/ObservationTab'
import ConditionTab from './tabs/ConditionTab'
import ServiceRequestTab from './tabs/ServiceRequestTab'
import MedicationRequestTab from './tabs/MedicationRequestTab'
import content from './AddClinicalEncounter.content'

type Props = {
    patientId: string
    onSuccess?: () => void
}

const AddClinicalEncounter = ({ patientId, onSuccess }: Props) => {
    const { form, onSubmit } = useClinicalEncounter(patientId, onSuccess)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Tabs aria-label="Encounter" defaultValue="observation">
                    <div className="flex justify-between items-center">
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
                        <Button
                            type="submit"
                            size="sm"
                            className="mr-2"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting
                                ? content.textSaving
                                : content.textSave}
                        </Button>
                    </div>
                    <div className="mt-4">
                        <TabsContent value="observation">
                            <ObservationTab control={form.control} />
                        </TabsContent>
                        <TabsContent value="condition">
                            <ConditionTab control={form.control} />
                        </TabsContent>
                        <TabsContent value="service-request">
                            <ServiceRequestTab control={form.control} />
                        </TabsContent>
                        <TabsContent value="medication-request">
                            <MedicationRequestTab control={form.control} />
                        </TabsContent>
                    </div>
                </Tabs>
            </form>
        </Form>
    )
}

export default AddClinicalEncounter
