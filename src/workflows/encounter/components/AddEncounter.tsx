import { useForm } from 'react-hook-form'
// import { toast } from 'sonner'
// import { usePatientContext } from '@resources/patient/hooks/usePatientContext'
// import { useLogger } from '@shared/hooks/useLogger'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@shared/components/ui/base/tabs'
import ObservationTab from './tabs/ObservationTab'
import ConditionTab from './tabs/ConditionTab'
import ServiceRequestTab from './tabs/ServiceRequestTab'
import MedicationRequestTab from './tabs/MedicationRequestTab'
import content from './AddEncounter.content'

const AddEncounter = () => {
    // const { logError, logSuccess } = useLogger('RegisterPatientForm')

    // const { patientData } = usePatientContext()

    // const defaultValues: { null }

    const form = useForm({
        defaultValues: undefined,
    })

    const onSubmit = async () => {
        return
    }

    return (
        <Form {...form}>
            <form onSubmit={undefined}>
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
                        <Button type="submit" size="sm" className="mr-2">
                            {content.textSaving}
                            {/* {form.formState.isSubmitting ? {content.textSaving} : {content.textSave}} */}
                        </Button>
                    </div>
                    <div className="mt-4">
                        <TabsContent value="observation">
                            {/* <AddObservation control={form.control} /> */}
                            <ObservationTab />
                        </TabsContent>
                        <TabsContent value="condition">
                            {/* <AddCondition control={form.control} /> */}
                            <ConditionTab />
                        </TabsContent>
                        <TabsContent value="service-request">
                            {/* <AddServiceRequest control={form.control} /> */}
                            <ServiceRequestTab />
                        </TabsContent>
                        <TabsContent value="medication-request">
                            {/* <AddMedicationRequest control={form.control} /> */}
                            <MedicationRequestTab />
                        </TabsContent>
                    </div>
                </Tabs>
            </form>
        </Form>
    )
}

export default AddEncounter
