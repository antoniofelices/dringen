import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
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

const FormAdd = ({ contentPfsh }: { contentPfsh: ContentPfsh }) => {
    const form = useForm<FormData>({
        defaultValues: {
            pastMedicalHistory: contentPfsh.past_medical_history ?? '',
            familyHistory: contentPfsh.family_history ?? '',
            socialHistory: contentPfsh.social_history ?? '',
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
            console.log('Data updated successfully:', data)
        } catch (error) {
            const postgrestError = error as PostgrestError
            const { field, message } = mapSupabaseError(postgrestError.message)
            form.setError(field as keyof FormData, {
                type: 'server',
                message,
            })
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

const Pfsh = ({ contentPfsh }: { contentPfsh: ContentPfsh }) => {
    const displayContent = contentPfsh ? true : false

    const [toggle, setToggle] = useState(true)

    const handleClick = () => {
        setToggle(!toggle)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
                {displayContent && (
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
                {displayContent === false || toggle === false ? (
                    <FormAdd contentPfsh={contentPfsh} />
                ) : (
                    <LoadData contentPfsh={contentPfsh} />
                )}
            </CardContent>
        </Card>
    )
}

export default Pfsh
