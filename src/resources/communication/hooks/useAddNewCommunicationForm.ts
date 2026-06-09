import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogger } from '@shared/hooks/useLogger'
import { useCurrentUser } from '@auth/hooks/useCurrentUser'
import { addNewCommunicationSchema } from '@resources/communication/schemas/addNewCommunication.schema'
import { useCreateCommunication } from '@resources/communication/hooks/useCreateCommunication'
import type {
    AddNewCommunicationType,
    AddNewCommunicationFormProps,
} from '@resources/communication/types/communication.model'
import { contentES as content } from '@resources/communication/components/AddNewCommunicationForm.content'

export const useAddNewCommunicationForm = ({
    onSuccess,
}: AddNewCommunicationFormProps = {}) => {
    const { logError, logSuccess } = useLogger('AddNewCommunicationForm')
    const navigate = useNavigate()
    const { user } = useCurrentUser()
    const createCommunication = useCreateCommunication()

    const form = useForm<AddNewCommunicationType>({
        resolver: zodResolver(addNewCommunicationSchema),
        defaultValues: {
            title: '',
            content: '',
            startDate: undefined,
            endDate: undefined,
            location: '',
        },
    })

    const onSubmit = async (formData: AddNewCommunicationType) => {
        if (!user) {
            form.setError('root', { message: content.errorNoUser })
            return
        }

        try {
            await createCommunication.mutateAsync({
                formData,
                sender: {
                    id: user.id,
                    displayName: `${user.firstName} ${user.lastName}`,
                },
            })
            logSuccess(content.textToastSuccess, content.title)
            toast.success(content.textToastSuccess)
            form.reset()
            if (onSuccess) {
                onSuccess()
            } else {
                navigate({ to: '/communication/communication-list' })
            }
        } catch (error) {
            logError(content.textToastFail, error, content.title)
            toast.error(content.textToastFail)
        }
    }

    return { form, onSubmit }
}
