import { useState } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { updateAccountUser } from '@/services/supabaseService'
import mapSupabaseError from '@/services/mapSupabaseErrors'
import { useEditableForm } from '@/hooks/useEditableForm'
import { transformDate } from '@/lib/utils'
import type { PostgrestError } from '@supabase/supabase-js'
import type { UserType } from '@/types/interfaces'
import { useCurrentUser } from '@hooks/useCurrentUser'
import { Button } from '@components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import { Form } from '@components/ui/base/form'
import DataDisplayList from '@components/ui/DataDisplayList'
import FormFieldInput from '@/components/ui/FormFieldInput'
import ErrorApi from '@components/ui/ErrorApi'
import Loading from '@components/ui/Loading'
import content from '@data/settings/accountDetails'

const updateAccountSchema = z.object({
    userName: z
        .string()
        .min(3, content.errorUserNameTooShort)
        .max(20, content.errorUserNameTooLong)
        .optional(),
    userLastName: z
        .string()
        .min(3, content.errorUserLastNameTooShort)
        .max(20, content.errorUserLastNameTooLong)
        .optional(),
    email: z
        .string()
        .email(content.errorEmailInvalid)
        .min(1, content.errorEmailRequired)
        .optional(),
})

type FormData = {
    userName?: string
    userLastName?: string
    email?: string
}

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

    const onSubmit = async (formData: FormData) => {
        setIsSubmitting(true)
        try {
            await updateAccountUser(
                contentUser.id,
                formData.userName,
                formData.userLastName,
                formData.email
            )
            toast.success(content.textToastSuccess)
            onSuccess()
        } catch (error) {
            const postgrestError = error as PostgrestError
            const { field, message } = mapSupabaseError(postgrestError.message)

            if (field && field in formData) {
                form.setError('root', {
                    type: 'server',
                    message,
                })
            }
            toast.error(`${content.textToastFail}: ${message}`)
        } finally {
            setIsSubmitting(false)
        }
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
    const { user, isPending, isError, error, refetch } = useCurrentUser()

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
