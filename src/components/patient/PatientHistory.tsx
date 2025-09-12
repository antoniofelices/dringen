import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { usePatientContext } from '@/hooks/usePatientContext'
import { useEditableForm } from '@/hooks/useEditableForm'
import { updateHistoryPatient } from '@services/supabaseService'
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
import DataDisplayList from '@components/ui/DataDisplayList'
import FormFieldTextarea from '@/components/ui/FormFieldTextarea'
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
    const defaultValues = {
        pastMedicalHistory: contentPatientHistory.past_medical_history || '',
        familyHistory: contentPatientHistory.family_history || '',
        socialHistory: contentPatientHistory.social_history || '',
    }

    const form = useForm<FormData>({
        defaultValues: defaultValues,
    })

    const onSubmit = async (formData: FormData) => {
        try {
            await updateHistoryPatient(
                contentPatientHistory.id,
                formData.pastMedicalHistory,
                formData.familyHistory,
                formData.socialHistory
            )
            toast.success(content.textToastSuccess)
            onSuccess()
        } catch (error) {
            const postgrestError = error as PostgrestError
            const { field, message } = mapSupabaseError(postgrestError.message)
            form.setError(field as keyof FormData, {
                type: 'server',
                message,
            })
            toast.error(`${content.textToastFail} ${message}`)
            return
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldTextarea
                    control={form.control}
                    fieldName="pastMedicalHistory"
                    label={content.labelPastMedicalHistory}
                />
                <FormFieldTextarea
                    control={form.control}
                    fieldName="familyHistory"
                    label={content.labelFamilyHistory}
                />
                <FormFieldTextarea
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

    const dataItems = [
        {
            label: content.labelPastMedicalHistory,
            value: patientHistory?.past_medical_history,
        },
        {
            label: content.labelFamilyHistory,
            value: patientHistory?.family_history,
        },
        {
            label: content.labelSocialHistory,
            value: patientHistory?.social_history,
        },
    ]

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
                        <DataDisplayList items={dataItems} />
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
        </Card>
    )
}

export default PatientHistory
