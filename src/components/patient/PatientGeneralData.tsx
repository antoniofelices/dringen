import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { updateMedicalPatientGeneralData } from '@services/supabaseService'
import mapSupabaseError from '@services/mapSupabaseErrors'
import type { PostgrestError } from '@supabase/supabase-js'
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

type ContentPatientGeneralDataType = {
    id: string
    birthday?: string | null
    gender?: string
    birthplace?: string
    place_of_residence?: string
    occupation?: string
}

type FormData = {
    birthday?: string | null
    gender?: string
    birthplace?: string
    placeOfResidence?: string
    occupation?: string
}

type UpdatePatientGeneralData = ContentPatientGeneralDataType[]

const FormAdd = ({
    contentPatientGeneralData,
    onSuccess,
}: {
    contentPatientGeneralData: ContentPatientGeneralDataType
    onSuccess: (updatedData: UpdatePatientGeneralData) => void
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
            const data = await updateMedicalPatientGeneralData(
                contentPatientGeneralData.id,
                normalizeDate(formData.birthday),
                formData.gender,
                formData.birthplace,
                formData.placeOfResidence,
                formData.occupation
            )
            toast.success('Patient general data updated successfully')
            onSuccess(data as ContentPatientGeneralDataType[])
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
    contentPatientGeneralData: ContentPatientGeneralDataType
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

const PatientGeneralData = ({
    contentPatientGeneralData,
}: {
    contentPatientGeneralData: ContentPatientGeneralDataType
}) => {
    const isDataComplete = Boolean(
        contentPatientGeneralData.birthday ||
            contentPatientGeneralData.gender ||
            contentPatientGeneralData.birthplace ||
            contentPatientGeneralData.place_of_residence ||
            contentPatientGeneralData.occupation
    )

    const [toggle, setToggle] = useState(isDataComplete)
    const [currentData, setCurrentData] = useState(contentPatientGeneralData)

    const handleClick = useCallback(() => {
        setToggle(!toggle)
    }, [toggle])

    const handleFormSuccess = useCallback(
        (updatedData: UpdatePatientGeneralData) => {
            if (updatedData && updatedData.length > 0) {
                setCurrentData(updatedData[0])
            }
            setToggle(true)
        },
        []
    )

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
                {contentPatientGeneralData && (
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
                    {toggle ? (
                        <LoadData contentPatientGeneralData={currentData} />
                    ) : (
                        <FormAdd
                            contentPatientGeneralData={currentData}
                            onSuccess={handleFormSuccess}
                        />
                    )}
                </>
            </CardContent>
            <Toaster />
        </Card>
    )
}

export default PatientGeneralData
