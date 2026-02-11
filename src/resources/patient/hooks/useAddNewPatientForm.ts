import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogger } from '@shared/hooks/useLogger'
import { addNewPatientSchema } from '@resources/patient/schemas/addNewPatient.schema'
import { useCreatePatient } from '@resources/patient/hooks/useCreatePatient'
import type { AddNewPatientType } from '@resources/patient/types/patient.model'
import content from '@resources/patient/components/AddNewPatientForm.content'

export const useAddNewPatientForm = () => {
    const { logError, logSuccess } = useLogger('RegisterPatientForm')
    const navigate = useNavigate()
    const createPatient = useCreatePatient()

    const form = useForm<AddNewPatientType>({
        resolver: zodResolver(addNewPatientSchema),
        defaultValues: {
            userName: '',
            userLastName: '',
            dni: '',
            email: '',
            phone: '',
            gender: undefined,
            birthDate: undefined,
            street: '',
            district: '',
            city: '',
            postcode: '',
            country: '',
        },
    })

    const onSubmit = async (formData: AddNewPatientType) => {
        try {
            const patient = await createPatient.mutateAsync(formData)
            logSuccess(content.textToastSuccess, content.title)
            navigate({ to: `/patient/${patient.id}` })
        } catch (error) {
            logError(content.textToastFail, error, content.title)
            toast.error(content.textToastFail)
        }
    }

    return { form, onSubmit }
}
