import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { usePatientContext } from '@/hooks/usePatientContext'
import { useEditableForm } from '@/hooks/useEditableForm'
import { updateGeneralDataPatient } from '@services/supabaseService'
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
import DataDisplayList from '@components/ui/DataDisplayList'
import FormFieldInput from '@/components/ui/FormFieldInput'
import FormFieldCalendar from '@/components/ui/FormFieldCalendar'
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
    const defaultValues = {
        birthday: contentPatientGeneralData.birthday || '',
        gender: contentPatientGeneralData.gender || '',
        birthplace: contentPatientGeneralData.birthplace || '',
        placeOfResidence: contentPatientGeneralData.place_of_residence || '',
        occupation: contentPatientGeneralData.occupation || '',
    }

    const form = useForm<FormData>({
        defaultValues: defaultValues,
    })

    const onSubmit = async (formData: FormData) => {
        try {
            await updateGeneralDataPatient(
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
                <FormFieldCalendar
                    control={form.control}
                    fieldName="birthday"
                    label={content.labelBirthday}
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="gender"
                    label={content.labelGender}
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="birthplace"
                    label={content.labelBirthplace}
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="placeOfResidence"
                    label={content.labelPlaceOfResidence}
                />
                <FormFieldInput
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

    const dataItems = [
        {
            label: content.labelBirthday,
            value: patientData?.birthday
                ? transformDate(patientData?.birthday)
                : '',
        },
        {
            label: content.labelGender,
            value: patientData?.gender,
        },
        {
            label: content.labelBirthplace,
            value: patientData?.birthplace,
        },
        {
            label: content.labelPlaceOfResidence,
            value: patientData?.place_of_residence,
        },
        {
            label: content.labelOccupation,
            value: patientData?.occupation,
        },
    ]

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
                        <DataDisplayList items={dataItems} />
                    ) : patientData ? (
                        <FormAdd
                            contentPatientGeneralData={patientData}
                            onSuccess={handleFormSuccess}
                        />
                    ) : null}
                </>
            </CardContent>
        </Card>
    )
}

export default PatientGeneralData
