import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { usePatientContext } from '@/hooks/usePatientContext'
import { useEditableForm } from '@/hooks/useEditableForm'
import { updateMedicalPatientHistory } from '@services/supabaseService'
import mapSupabaseError from '@services/mapSupabaseErrors'
import type { PostgrestError } from '@supabase/supabase-js'
import type { PatientHistoryType } from '@/types/interfaces'
import { Button } from '@components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@components/ui/base/card'
import { Form } from '@components/ui/base/form'
import FormFieldTextareaControl from '@components/ui/FormFieldTextareaControl'
import content from '@/config/data/patient/patientHistory'

type FormData = {
    pastMedicalHistory: string
    familyHistory: string
    socialHistory: string
}

const FormAdd = ({
    contentPatientHistory,
    onSuccess,
}: {
    contentPatientHistory: PatientHistoryType
    onSuccess: () => void
}) => {
    const form = useForm<FormData>({
        defaultValues: {
            pastMedicalHistory:
                contentPatientHistory.past_medical_history || '',
            familyHistory: contentPatientHistory.family_history || '',
            socialHistory: contentPatientHistory.social_history || '',
        },
    })

    const onSubmit = async (formData: FormData) => {
        try {
            await updateMedicalPatientHistory(
                contentPatientHistory.id,
                formData.pastMedicalHistory,
                formData.familyHistory,
                formData.socialHistory
            )
            toast.success('Patient history updated successfully')
            onSuccess()
        } catch (error) {
            const postgrestError = error as PostgrestError
            const { field, message } = mapSupabaseError(postgrestError.message)
            form.setError(field as keyof FormData, {
                type: 'server',
                message,
            })
            toast.error(`Failed to update patient history: ${message}`)
            return
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldTextareaControl
                    control={form.control}
                    fieldName="pastMedicalHistory"
                    label={content.labelPastMedicalHistory}
                />
                <FormFieldTextareaControl
                    control={form.control}
                    fieldName="familyHistory"
                    label={content.labelFamilyHistory}
                />
                <FormFieldTextareaControl
                    control={form.control}
                    fieldName="socialHistory"
                    label={content.labelSocialHistory}
                />
                <Button
                    type="submit"
                    className="mt-4"
                    size="sm"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting
                        ? content.textButtonSending
                        : content.textButtonSend}
                </Button>
            </form>
        </Form>
    )
}

const LoadData = ({
    contentPatientHistory,
}: {
    contentPatientHistory: PatientHistoryType
}) => {
    const contentPastMedicalHistory = contentPatientHistory.past_medical_history
    const contentFamilyHistory = contentPatientHistory.family_history
    const contentSocialHistory = contentPatientHistory.social_history

    return (
        <ul>
            <li className="my-2">
                <span className="font-bold">
                    {content.labelPastMedicalHistory}
                </span>
                : {contentPastMedicalHistory}
            </li>
            <li className="my-2">
                <span className="font-bold">{content.labelFamilyHistory}</span>:{' '}
                {contentFamilyHistory}
            </li>
            <li className="my-2">
                <span className="font-bold">{content.labelSocialHistory}</span>:{' '}
                {contentSocialHistory}
            </li>
        </ul>
    )
}

const PatientHistory = () => {
    const { patientHistory, refetchPatient } = usePatientContext()

    const completenessCheck = (data: PatientHistoryType) =>
        Boolean(
            data.past_medical_history ||
                data.family_history ||
                data.social_history
        )

    const { isEditing, handleToggle, handleFormSuccess } = useEditableForm(
        patientHistory,
        completenessCheck,
        refetchPatient
    )

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
                {patientHistory && (
                    <CardAction>
                        <Button
                            size="xs"
                            variant="outline"
                            onClick={handleToggle}
                        >
                            {!isEditing ? <>{content.textButtonEdit}</> : <X />}
                        </Button>
                    </CardAction>
                )}
            </CardHeader>
            <CardContent>
                <>
                    {!isEditing && patientHistory ? (
                        <LoadData contentPatientHistory={patientHistory} />
                    ) : (
                        patientHistory && (
                            <FormAdd
                                contentPatientHistory={patientHistory}
                                onSuccess={handleFormSuccess}
                            />
                        )
                    )}
                </>
            </CardContent>
            <Toaster />
        </Card>
    )
}

export default PatientHistory
