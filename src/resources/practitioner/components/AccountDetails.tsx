import { useState } from 'react'
// import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { useEditableForm } from '@shared/hooks/useEditableForm'
import { transformDate } from '@shared/utils/utils'
import type { PractitionerType } from '@resources/practitioner/types/practitioner.model'
import { useCurrentPractitioner } from '@resources/practitioner/hooks/useCurrentPractitioner'
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
import ErrorApi from '@shared/components/ui/ErrorApi'
import Loading from '@shared/components/ui/Loading'
import content from './AccountDetails.content'
import { updateAccountSchema } from '@resources/practitioner/schemas/updateAccountSchema.schema'

type FormData = z.infer<typeof updateAccountSchema>

const FormUpdate = ({
    contentUser,
    onSuccess,
}: {
    contentUser: UserType
    onSuccess: () => void
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const defaultValues = {
        userName: contentUser.user_name || '',
        userLastName: contentUser.user_last_name || '',
        email: contentUser.email || '',
    }

    const form = useForm<FormData>({
        resolver: zodResolver(updateAccountSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = () => {
        return
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldInput
                    control={form.control}
                    fieldName="userName"
                    label={content.labelUserName}
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="userLastName"
                    label={content.labelUserLastName}
                />
                <FormFieldInput
                    control={form.control}
                    fieldName="email"
                    label={content.labelEmail}
                    type="email"
                />
                <Button
                    type="submit"
                    className="mt-4"
                    size="sm"
                    disabled={isSubmitting || form.formState.isSubmitting}
                >
                    {isSubmitting || form.formState.isSubmitting
                        ? content.textButtonSending
                        : content.textButtonSend}
                </Button>
            </form>
        </Form>
    )
}

const AccountDetails = () => {
    const { user, isPending, isError, error, refetch } =
        useCurrentPractitioner()

    const completenessCheck = (data: UserType) =>
        Boolean(data.user_name || data.user_last_name || data.email)

    const { isEditing, handleToggle, handleFormSuccess } = useEditableForm(
        user ||
            ({
                user_name: ' ',
                user_last_name: ' ',
                email: ' ',
            } as UserType),
        completenessCheck,
        refetch
    )

    if (isPending) return <Loading />

    if (isError && error) return <ErrorApi message={error.message} />

    const dataItems = [
        {
            label: content.labelUserName,
            value: `${user?.user_name} ${user?.user_last_name}`,
        },
        {
            label: content.labelEmail,
            value: user?.email,
        },
        {
            label: content.labelCreatedAt,
            value: user?.created_at ? transformDate(user?.created_at) : '',
        },
        {
            label: content.labelUpdatedAt,
            value: user?.updated_at ? transformDate(user?.updated_at) : '',
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2>{content.title}</h2>
                </CardTitle>
                <CardAction>
                    <Button size="xs" variant="outline" onClick={handleToggle}>
                        {!isEditing ? <>{content.textButtonEdit}</> : <X />}
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                {!isEditing && user ? (
                    <DataDisplayList items={dataItems} />
                ) : user ? (
                    <FormUpdate
                        contentUser={user}
                        onSuccess={handleFormSuccess}
                    />
                ) : null}
            </CardContent>
        </Card>
    )
}

export default AccountDetails
