import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import { usePatientContext } from '@/hooks/usePatientContext'
import { registerClinicalHistory } from '@/services/supabaseService'
import mapSupabaseError from '@/services/mapSupabaseErrors'
import type { PostgrestError } from '@supabase/supabase-js'
import type { ClinicalHistoryFormDataType } from '@/types/interfaces'
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
import content from '@/config/data/clinical-history/addClinicalHistory'

const AddClinicalHistory = () => {
    const { patientData } = usePatientContext()

    const defaultValues: ClinicalHistoryFormDataType = {
        patient_id: patientData?.id || '',
        type_of: '',
        examination: '',
        mood: '',
        test: '',
        temperature: '' as any,
        pas: '' as any,
        pad: '' as any,
        fc: '' as any,
        fr: '' as any,
        oximetry: '' as any,
        eating: '',
        thirst: '',
        urine: '',
        feces: '',
        sleep: '',
        person_weight: '' as any,
        person_height: '' as any,
        imc: '' as any,
        waist: '' as any,
        bfp: '' as any,
        mmp: '' as any,
        gfp: '' as any,
        additional_tests: '',
        treatment: '',
    }

    const form = useForm<ClinicalHistoryFormDataType>({
        defaultValues: defaultValues,
    })

    const onSubmit = async (formData: ClinicalHistoryFormDataType) => {
        try {
            await registerClinicalHistory(
                patientData?.id ?? undefined,
                '',
                formData.examination ?? '',
                formData.mood ?? '',
                formData.test ?? '',
                formData.temperature ? Number(formData.temperature) : undefined,
                formData.pas ? Number(formData.pas) : undefined,
                formData.pad ? Number(formData.pad) : undefined,
                formData.fc ? Number(formData.fc) : undefined,
                formData.fr ? Number(formData.fr) : undefined,
                formData.oximetry ? Number(formData.oximetry) : undefined,
                formData.eating ?? '',
                formData.thirst ?? '',
                formData.urine ?? '',
                formData.feces ?? '',
                formData.sleep ?? '',
                formData.person_weight
                    ? Number(formData.person_weight)
                    : undefined,
                formData.person_height
                    ? Number(formData.person_height)
                    : undefined,
                formData.imc ? Number(formData.imc) : undefined,
                formData.waist ? Number(formData.waist) : undefined,
                formData.bfp ? Number(formData.bfp) : undefined,
                formData.mmp ? Number(formData.mmp) : undefined,
                formData.gfp ? Number(formData.gfp) : undefined,
                formData.additional_tests ?? '',
                formData.treatment ?? ''
            )
            toast.success(content.textToastSuccess)
        } catch (error) {
            const postgrestError = error as PostgrestError
            const { field, message } = mapSupabaseError(postgrestError.message)
            form.setError(field as keyof ClinicalHistoryFormDataType, {
                type: 'server',
                message,
            })
            toast.error(`${content.textToastFail}: ${message}`)
            return
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Tabs
                        aria-label="Previous revision"
                        defaultValue="examination"
                    >
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
                                {form.formState.isSubmitting
                                    ? 'Saving'
                                    : 'Save'}
                            </Button>
                        </div>
                        <div className="mt-4">
                            <TabsContent value="examination">
                                <AddExamination control={form.control} />
                            </TabsContent>
                            <TabsContent value="examination-data">
                                <AddExaminationData control={form.control} />
                            </TabsContent>
                            <TabsContent value="diagnosis"></TabsContent>
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
            <Toaster />
        </>
    )
}

export default AddClinicalHistory
