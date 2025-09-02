import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
// import { z } from 'zod'
import { useEditableForm } from '@/hooks/useEditableForm'
import { transformDate } from '@/lib/utils'
import { USERROLES } from '@/config/config.ts'
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
import FormFieldInputControl from '@/components/ui/FormFieldInputControl'
import FormFieldSelectControl from '@components/ui/FormFieldSelectControl'
import content from '@/config/data/user/userDetails'

// const updateUserSchema = z.object({
//     userName: z
//         .string()
//         .min(3, content.errorUserNameTooShort)
//         .max(20, content.errorUserNameTooLong),
//     userLastName: z
//         .string()
//         .min(3, content.errorUserLastNameTooShort)
//         .max(20, content.errorUserLastNameTooLong),
//     email: z
//         .string()
//         .email(content.errorEmailInvalid)
//         .min(1, content.errorEmailRequired),
//     role: z.enum(USERROLES),
// })
type FormData = {
    userName?: string | null
    userLastName?: string | null
    email?: string | null
    role?: 'user'
}

const FormAdd = ({
    contentUser,
    onSuccess,
}: {
    contentUser: FormData
    onSuccess: () => void
}) => {
    const defaultValues = {
        userName: contentUser.userName || '',
        userLastName: contentUser.userLastName || '',
        email: contentUser.email || '',
        role: 'user' as const,
    }

    const form = useForm<FormData>({
        defaultValues: defaultValues,
    })

    const onSubmit = async (formData: FormData) => {}

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldInputControl
                    control={form.control}
                    fieldName="userName"
                    label={content.labelUserName}
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="userLastName"
                    label={content.labelUserLastName}
                />
                <FormFieldInputControl
                    control={form.control}
                    fieldName="email"
                    label={content.labelEmail}
                    type="email"
                />
                <FormFieldSelectControl
                    control={form.control}
                    fieldName="role"
                    label={content.labelRole}
                    options={USERROLES}
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

const UserDetails = ({ userData, refetch }) => {
    console.log(userData)

    const completenessCheck = (data) =>
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
            value: transformDate(userData?.created_at),
        },
        {
            label: content.labelUpdatedAt,
            value: transformDate(userData?.updated_at),
        },
    ]

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2 className="mb-8">{content.title}</h2>
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
                    {!isEditing && userData ? (
                        <DataDisplayList items={dataItems} />
                    ) : userData ? (
                        <FormAdd
                            contentUser={userData}
                            onSuccess={handleFormSuccess}
                        />
                    ) : null}
                </CardContent>
            </Card>
        </>
    )
}

export default UserDetails
