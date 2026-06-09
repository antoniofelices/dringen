import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import type {
    PractitionerDetailsFormType,
    UsePractitionerDetailsFormProps,
} from '@resources/practitioner/types/practitioner.model'
import { practitionerDetailsSchema } from '@resources/practitioner/schemas/practitionerDetails.schema'
import { useUpdatePractitionerDetails } from '@resources/practitioner/hooks/useUpdatePractitionerDetails'
import { contentES as content } from '@resources/practitioner/components/PractitionerDetails/PractitionerDetails.content'

export const usePractitionerDetailsForm = ({
    practitionerId,
    hospitalId,
    defaultValues,
    onSuccess,
}: UsePractitionerDetailsFormProps) => {
    const updateDetails = useUpdatePractitionerDetails(
        practitionerId,
        hospitalId
    )

    const form = useForm<PractitionerDetailsFormType>({
        resolver: zodResolver(practitionerDetailsSchema),
        defaultValues,
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'availableTime',
    })

    const addTimeHandler = () => {
        append({ daysOfWeek: '', startTime: '', endTime: '' })
    }

    const removeTimeHandler = (index: number) => {
        remove(index)
    }

    const onSubmit = async (formData: PractitionerDetailsFormType) => {
        try {
            await updateDetails.mutateAsync(formData)
        } catch {
            toast.error(content.textToastFail)
            return
        }
        toast.success(content.textToastSuccess)
        onSuccess()
    }

    return { form, fields, addTimeHandler, removeTimeHandler, onSubmit }
}
