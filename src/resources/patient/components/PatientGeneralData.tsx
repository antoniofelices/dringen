import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import type { PatientType } from '@resources/patient/types/patient.model'
import { Button } from '@shared/components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import { Form } from '@shared/components/ui/base/form'
import DataDisplayList from '@shared/components/ui/DataDisplayList'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import { useEditableForm } from '@shared/hooks/useEditableForm'
import content from './PatientGeneralData.content'

const { genderOptions, maritalStatusOptions } = content

type FormData = {
    firstName: string
    lastName: string
    gender: string
    maritalStatus: string
}

const FormAdd = ({
    patientData,
    onSuccess,
}: {
    patientData: PatientType
    onSuccess: () => void
}) => {
    const form = useForm<FormData>({
        defaultValues: {
            firstName: patientData.firstName || '',
            lastName: patientData.lastName || '',
            gender: patientData.gender || '',
            maritalStatus: patientData.maritalStatus || '',
        },
    })

    const onSubmit = () => {
        onSuccess()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="firstName"
                        label={content.labelFirstName}
                        type="text"
                    />
                    <FormFieldInput
                        control={form.control}
                        fieldName="lastName"
                        label={content.labelLastName}
                        type="text"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldCombobox
                        control={form.control}
                        fieldName="gender"
                        label={content.labelGender}
                        options={genderOptions}
                    />
                    <FormFieldCombobox
                        control={form.control}
                        fieldName="maritalStatus"
                        label={content.labelMaritalStatus}
                        options={maritalStatusOptions}
                    />
                </div>
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

const PatientGeneralData = ({
    patientData,
    onRefetch,
}: {
    patientData: PatientType | null
    onRefetch: () => void
}) => {
    if (!patientData) return null

    const completenessCheck = (data: PatientType) =>
        Boolean(data.firstName && data.lastName && data.gender && data.maritalStatus)

    const { isEditing, handleToggle, handleFormSuccess } = useEditableForm(
        patientData,
        completenessCheck,
        onRefetch
    )

    const genderLabel = genderOptions.find(
        (o) => o.value === patientData.gender
    )?.label

    const maritalStatusLabel = maritalStatusOptions.find(
        (o) => o.value === patientData.maritalStatus
    )?.label

    const dataItems = [
        { label: content.labelFirstName, value: patientData.firstName },
        { label: content.labelLastName, value: patientData.lastName },
        { label: content.labelGender, value: genderLabel },
        { label: content.labelMaritalStatus, value: maritalStatusLabel },
    ]

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
                <CardAction>
                    <Button
                        size="xs"
                        variant="outline"
                        onClick={handleToggle}
                    >
                        {!isEditing ? <>{content.textButtonEdit}</> : <X />}
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                {!isEditing ? (
                    <DataDisplayList items={dataItems} />
                ) : (
                    <FormAdd
                        patientData={patientData}
                        onSuccess={handleFormSuccess}
                    />
                )}
            </CardContent>
        </Card>
    )
}

export default PatientGeneralData
