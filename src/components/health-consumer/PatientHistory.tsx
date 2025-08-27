import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { updateMedicalPatientHistory } from '@/services/supabaseService'
import mapSupabaseError from '@/services/mapSupabaseErrors'
import type { PostgrestError } from '@supabase/supabase-js'
import { Button } from '@/components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import { Form } from '@components/ui/base/form'
import FormFieldTextareaControl from '@/components/ui/FormFieldTextareaControl'
import content from '@/config/data/health-consumer/pfsh'

type ContentPfsh = {
    id: string
    family_history?: string
    past_medical_history?: string
    social_history?: string
}

type FormData = {
    pastMedicalHistory: string
    familyHistory: string
    socialHistory: string
}

type UpdatedMedicalHistory = ContentPfsh[]

const FormAdd = ({
    contentPfsh,
    onSuccess,
}: {
    contentPfsh: ContentPfsh
    onSuccess: (updatedData: UpdatedMedicalHistory) => void
}) => {
    const form = useForm<FormData>({
        defaultValues: {
            pastMedicalHistory: contentPfsh.past_medical_history || '',
            familyHistory: contentPfsh.family_history || '',
            socialHistory: contentPfsh.social_history || '',
        },
    })

    const onSubmit = async (formData: FormData) => {
        try {
            const data = await updateMedicalPatientHistory(
                contentPfsh.id,
                formData.pastMedicalHistory,
                formData.familyHistory,
                formData.socialHistory
            )
            toast.success('Patient history updated successfully')
            onSuccess(data)
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

const LoadData = ({ contentPfsh }: { contentPfsh: ContentPfsh }) => {
    const contentPastMedicalHistory = contentPfsh.past_medical_history
    const contentFamilyHistory = contentPfsh.family_history
    const contentSocialHistory = contentPfsh.social_history

    return (
        <ul className="">
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

const PatientHistory = ({ contentPfsh }: { contentPfsh: ContentPfsh }) => {
    const [toggle, setToggle] = useState(true)
    const [currentData, setCurrentData] = useState(contentPfsh)

    const handleClick = useCallback(() => {
        setToggle(!toggle)
    }, [toggle])

    const handleFormSuccess = useCallback(
        (updatedData: UpdatedMedicalHistory) => {
            if (updatedData && updatedData.length > 0) {
                setCurrentData(updatedData[0])
            }
            setToggle(true)
        },
        []
    )

    return (
        <Card>
            <Toaster />
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
                {contentPfsh && (
                    <CardAction>
                        <Button
                            size="xs"
                            variant="outline"
                            onClick={handleClick}
                        >
                            {toggle ? <>{content.textButtonEdit}</> : <X />}
                        </Button>
                    </CardAction>
                )}
            </CardHeader>
            <CardContent>
                <>
                    {!contentPfsh || !toggle ? (
                        <FormAdd
                            contentPfsh={currentData}
                            onSuccess={handleFormSuccess}
                        />
                    ) : (
                        <LoadData contentPfsh={currentData} />
                    )}
                </>
            </CardContent>
        </Card>
    )
}

export default PatientHistory
