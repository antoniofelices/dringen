import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { usePatientContext } from '@/hooks/usePatientContext'
import { useEditableForm } from '@/hooks/useEditableForm'
import { updateMedicalPatientGeneralData } from '@services/supabaseService'
import mapSupabaseError from '@services/mapSupabaseErrors'
import type { PostgrestError } from '@supabase/supabase-js'
import type { PatientWithRelationsType } from '@/types/interfaces'
import { transformDate, normalizeDate } from '@/lib/utils'
import { Button } from '@components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@components/ui/base/card'
import { Form } from '@components/ui/base/form'
import FormFieldInputControl from '@components/ui/FormFieldInputControl'
import FormFieldCalendarControl from '@components/ui/FormFieldCalendarControl'
import content from '@/config/data/patient/patientGeneralData'

type FormData = {
    birthday?: string | null
    gender?: string
    birthplace?: string
    placeOfResidence?: string
    occupation?: string
}

const FormAdd = ({
    contentPatientGeneralData,
    onSuccess,
}: {
    contentPatientGeneralData: PatientWithRelationsType
    onSuccess: () => void
}) => {
    const form = useForm<FormData>({
        defaultValues: {
            birthday: contentPatientGeneralData.birthday || '',
            gender: contentPatientGeneralData.gender || '',
            birthplace: contentPatientGeneralData.birthplace || '',
            placeOfResidence:
                contentPatientGeneralData.place_of_residence || '',
            occupation: contentPatientGeneralData.occupation || '',
        },
    })

    const onSubmit = async (formData: FormData) => {
        try {
            await updateMedicalPatientGeneralData(
                contentPatientGeneralData.id,
                normalizeDate(formData.birthday),
                formData.gender,
                formData.birthplace,
                formData.placeOfResidence,
                formData.occupation
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
            toast.error(`${content.textToastFail}: ${message}`)
            return
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldCalendarControl
                    control={form.control}
                    fieldName="birthday"
                    label={content.labelBirthday}
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="gender"
                    label={content.labelGender}
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="birthplace"
                    label={content.labelBirthplace}
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="placeOfResidence"
                    label={content.labelPlaceOfResidence}
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="occupation"
                    label={content.labelOccupation}
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
    contentPatientGeneralData,
}: {
    contentPatientGeneralData: PatientWithRelationsType
}) => {
    const contentBirthday = contentPatientGeneralData.birthday
        ? transformDate(contentPatientGeneralData.birthday)
        : ''
    const contentGender = contentPatientGeneralData.gender
    const contentBirthplace = contentPatientGeneralData.birthplace
    const contentPlaceOfResidence = contentPatientGeneralData.place_of_residence
    const contentOccupation = contentPatientGeneralData.occupation

    return (
        <ul>
            <li className="my-2">
                <span className="font-bold">{content.labelBirthday}</span>:{' '}
                {contentBirthday}
            </li>
            <li className="my-2">
                <span className="font-bold">{content.labelGender}</span>:{' '}
                {contentGender}
            </li>
            <li className="my-2">
                <span className="font-bold">{content.labelBirthplace}</span>:{' '}
                {contentBirthplace}
            </li>
            <li className="my-2">
                <span className="font-bold">
                    {content.labelPlaceOfResidence}
                </span>
                : {contentPlaceOfResidence}
            </li>
            <li className="my-2">
                <span className="font-bold">{content.labelOccupation}</span>:{' '}
                {contentOccupation}
            </li>
        </ul>
    )
}

const PatientGeneralData = () => {
    const { patientData, refetchPatient } = usePatientContext()

    const completenessCheck = (data: PatientWithRelationsType) =>
        Boolean(
            data.birthday ||
                data.gender ||
                data.birthplace ||
                data.place_of_residence ||
                data.occupation
        )

    const { isEditing, handleToggle, handleFormSuccess } = useEditableForm(
        patientData,
        completenessCheck,
        refetchPatient
    )

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
                {patientData && (
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
                    {!isEditing && patientData ? (
                        <LoadData contentPatientGeneralData={patientData} />
                    ) : patientData ? (
                        <FormAdd
                            contentPatientGeneralData={patientData}
                            onSuccess={handleFormSuccess}
                        />
                    ) : null}
                </>
            </CardContent>
            <Toaster />
        </Card>
    )
}

export default PatientGeneralData
