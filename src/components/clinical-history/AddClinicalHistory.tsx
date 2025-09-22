import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { usePatientContext } from '@/hooks/usePatientContext'
import {
    registerClinicalHistory,
    registerDiagnosis,
} from '@/services/supabaseService'
import type { ClinicalHistoryFormDataType } from '@/types/interfaces'
import { useLogger } from '@/hooks/useLogger'
import { Button } from '@components/ui/base/button'
import { Form } from '@components/ui/base/form'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@components/ui/base/tabs'
import AddExamination from '@components/clinical-history/AddExamination'
import AddExaminationData from '@components/clinical-history/AddExaminationData'
import AddAdditionalTest from '@components/clinical-history/AddAdditionalTest'
import AddTreatment from '@components/clinical-history/AddTreatment'
import AddDiagnosis from '@components/clinical-history/AddDiagnosis'
import content from '@/config/data/clinical-history/addClinicalHistory'

type Props = {
    onSuccess?: () => void
}

const AddClinicalHistory = ({ onSuccess }: Props) => {
    const { logError, logSuccess } = useLogger('RegisterPatientForm')

    const { patientData } = usePatientContext()

    const defaultValues: ClinicalHistoryFormDataType = {
        patient_id: patientData?.id || '',
        type_of: '',
        examination: '',
        mood: '',
        test: '',
        temperature: undefined,
        pas: undefined,
        pad: undefined,
        fc: undefined,
        fr: undefined,
        oximetry: undefined,
        eating: '',
        thirst: '',
        urine: '',
        feces: '',
        sleep: '',
        person_weight: undefined,
        person_height: undefined,
        imc: undefined,
        waist: undefined,
        bfp: undefined,
        mmp: undefined,
        gfp: undefined,
        additional_tests: '',
        treatment: '',
        diagnoses: [
            {
                cie10: '',
                diagnosis: '',
                certainty: 'suspected',
            },
        ],
    }

    const form = useForm<ClinicalHistoryFormDataType>({
        defaultValues: defaultValues,
    })

    const onSubmit = async (formData: ClinicalHistoryFormDataType) => {
        try {
            const clinicHistoryData = await registerClinicalHistory(
                patientData?.id ?? undefined,
                formData.type_of ?? '',
                formData.examination ?? '',
                formData.mood ?? '',
                formData.test ?? '',
                formData.temperature ?? undefined,
                formData.pas ?? undefined,
                formData.pad ?? undefined,
                formData.fc ?? undefined,
                formData.fr ?? undefined,
                formData.oximetry ?? undefined,
                formData.eating ?? '',
                formData.thirst ?? '',
                formData.urine ?? '',
                formData.feces ?? '',
                formData.sleep ?? '',
                formData.person_weight ?? undefined,
                formData.person_height ?? undefined,
                formData.imc ?? undefined,
                formData.waist ?? undefined,
                formData.bfp ?? undefined,
                formData.mmp ?? undefined,
                formData.gfp ?? undefined,
                formData.additional_tests ?? '',
                formData.treatment ?? ''
            )

            const validDiagnoses = formData.diagnoses.filter(
                (diagnosis) =>
                    diagnosis.cie10 ||
                    diagnosis.diagnosis ||
                    diagnosis.certainty
            )

            if (validDiagnoses.length > 0) {
                const diagnosisData = await registerDiagnosis(
                    clinicHistoryData.id,
                    validDiagnoses.map((diagnosis) => ({
                        ...diagnosis,
                        certainty: diagnosis.certainty || 'suspected',
                    }))
                )

                toast.success(content.textToastSuccess)
                logSuccess(content.textToastSuccess, content.title)
                form.reset()
                onSuccess?.()
                return { clinicHistoryData, diagnosisData }
            } else {
                toast.success(content.textToastSuccess)
                logSuccess(content.textToastSuccess, content.title)
                form.reset()
                onSuccess?.()
                return { clinicHistoryData, diagnosisData: null }
            }
        } catch (error) {
            logError(content.textToastFail, error, content.title)
            toast.error(content.textToastFail)
            return
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Tabs aria-label="Previous revision" defaultValue="examination">
                    <div className="flex justify-between items-center">
                        <TabsList>
                            <TabsTrigger value="examination">
                                {content.textExamination}
                            </TabsTrigger>
                            <TabsTrigger value="examination-data">
                                {content.textExaminationData}
                            </TabsTrigger>
                            <TabsTrigger value="diagnosis">
                                {content.textDiagnosis}
                            </TabsTrigger>
                            <TabsTrigger value="additional-tests">
                                {content.textAdditionalTests}
                            </TabsTrigger>
                            <TabsTrigger value="treatment">
                                {content.textTreatment}
                            </TabsTrigger>
                        </TabsList>
                        <Button type="submit" size="sm" className="mr-2">
                            {form.formState.isSubmitting ? 'Saving' : 'Save'}
                        </Button>
                    </div>
                    <div className="mt-4">
                        <TabsContent value="examination">
                            <AddExamination control={form.control} />
                        </TabsContent>
                        <TabsContent value="examination-data">
                            <AddExaminationData control={form.control} />
                        </TabsContent>
                        <TabsContent value="diagnosis">
                            <AddDiagnosis control={form.control} />
                        </TabsContent>
                        <TabsContent value="additional-tests">
                            <AddAdditionalTest control={form.control} />
                        </TabsContent>
                        <TabsContent value="treatment">
                            <AddTreatment control={form.control} />
                        </TabsContent>
                    </div>
                </Tabs>
            </form>
        </Form>
    )
}

export default AddClinicalHistory
