import { useState } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { updateUser } from '@/services/supabaseAdmin'
import { useEditableForm } from '@/hooks/useEditableForm'
import { transformDate } from '@/lib/utils'
import type { UserType } from '@/types/interfaces'
import { USERROLES } from '@/config/config.ts'
import { useLogger } from '@/hooks/useLogger'
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
import FormFieldSelect from '@/components/ui/FormFieldSelect'
import FormFieldSwitch from '@/components/ui/FormFieldSwitch'
import content from '@/config/data/user/userDetails'

const updateUserSchema = z.object({
    userName: z
        .string()
        .min(3, content.errorUserNameTooShort)
        .max(20, content.errorUserNameTooLong),
    userLastName: z
        .string()
        .min(3, content.errorUserLastNameTooShort)
        .max(20, content.errorUserLastNameTooLong),
    email: z
        .string()
        .email(content.errorEmailInvalid)
        .min(1, content.errorEmailRequired),
    role: z.enum(USERROLES),
    isActive: z.boolean(),
})

type FormData = z.infer<typeof updateUserSchema>

type UserDetailsProps = {
    userData: UserType
    refetch: () => void
}

const FormUpdate = ({
    contentUser,
    onSuccess,
}: {
    contentUser: UserType
    onSuccess: () => void
}) => {
    const { logError, logSuccess } = useLogger('RegisterUserForm')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const defaultValues = {
        userName: contentUser.user_name || '',
        userLastName: contentUser.user_last_name || '',
        email: contentUser.email || '',
        role: (contentUser.role || 'user') as (typeof USERROLES)[number],
        isActive: contentUser.is_active || false,
    }

    const form = useForm<FormData>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: defaultValues,
    })

    const onSubmit = async (formData: FormData) => {
        setIsSubmitting(true)
        try {
            const updateData = {
                user_name: formData.userName,
                user_last_name: formData.userLastName,
                email: formData.email,
                role: formData.role,
                is_active: formData.isActive,
            }

            await updateUser(contentUser.id, updateData)
            toast.success(content.textToastSuccess)
            logSuccess(content.textToastSuccess, content.title)
            onSuccess()
        } catch (error) {
            toast.error(`${content.textToastFail}`)
            logError(content.textToastFail, error, content.title)
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
                <FormFieldSelect
                    control={form.control}
                    fieldName="role"
                    label={content.labelRole}
                    options={USERROLES}
                />
                <FormFieldSwitch
                    className="mt-6"
                    control={form.control}
                    fieldName="isActive"
                    label={content.labelState}
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

const UserDetails = ({ userData, refetch }: UserDetailsProps) => {
    const completenessCheck = (data: UserType) =>
        Boolean(
            data.user_name || data.user_last_name || data.email || data.role
        )

    const { isEditing, handleToggle, handleFormSuccess } = useEditableForm(
        userData,
        completenessCheck,
        refetch
    )

    const accountState = userData.is_active
        ? content.labelIsActiveTrue
        : content.labelIsActiveFalse

    const dataItems = [
        {
            label: content.labelUserName,
            value: `${userData?.user_name} ${userData.user_last_name}`,
        },
        {
            label: content.labelEmail,
            value: userData?.email,
        },
        {
            label: content.labelRole,
            value: userData?.role,
        },
        {
            label: content.labelState,
            value: accountState,
        },
        {
            label: content.labelCreatedAt,
            value: userData?.created_at
                ? transformDate(userData?.created_at)
                : '',
        },
        {
            label: content.labelUpdatedAt,
            value: userData?.updated_at
                ? transformDate(userData?.updated_at)
                : '',
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="mb-8">{content.title}</h2>
                </CardTitle>
                <CardAction>
                    <Button size="xs" variant="outline" onClick={handleToggle}>
                        {!isEditing ? <>{content.textButtonEdit}</> : <X />}
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                {!isEditing && userData ? (
                    <DataDisplayList items={dataItems} />
                ) : userData ? (
                    <FormUpdate
                        contentUser={userData}
                        onSuccess={handleFormSuccess}
                    />
                ) : null}
            </CardContent>
        </Card>
    )
}

export default UserDetails
