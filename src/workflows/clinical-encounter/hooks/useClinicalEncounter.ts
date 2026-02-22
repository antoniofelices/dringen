import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useCurrentUser } from '@auth/hooks/useCurrentUser'
import { useLogger } from '@shared/hooks/useLogger'
import { clinicalEncounterSchema } from '@workflows/clinical-encounter/schemas/clinicalEncounter.schema'
import { buildClinicalEncounterBundle } from '@workflows/clinical-encounter/domain/clinicalEncounter.aggregate'
import { executeClinicalEncounterTransaction } from '@workflows/clinical-encounter/services/buildClinicalEncounterTransaction'
import type { ClinicalEncounterFormType } from '@workflows/clinical-encounter/types/clinicalEncounter.model'
import content from '@workflows/clinical-encounter/components/AddClinicalEncounter.content'

const defaultValues: ClinicalEncounterFormType = {
    description: '',
    examination: '',
    person_weight: '',
    person_height: '',
    temperature: '',
    pas: '',
    pad: '',
    fc: '',
    fr: '',
    oximetry: '',
    eating: '',
    thirst: '',
    urine: '',
    feces: '',
    sleep: '',
    mood: '',
    diagnoses: [{ cie10: '', diagnosis: '', certainty: 'suspected' }],
    additional_tests: '',
    treatment: '',
}

export const useClinicalEncounter = (
    patientId: string,
    onSuccess?: () => void
) => {
    const { user } = useCurrentUser()
    const { logError, logSuccess } = useLogger('ClinicalEncounter')

    const form = useForm<ClinicalEncounterFormType>({
        resolver: zodResolver(clinicalEncounterSchema),
        defaultValues,
    })

    const onSubmit = async (formData: ClinicalEncounterFormType) => {
        if (!user) {
            toast.error('No authenticated practitioner found')
            return
        }

        try {
            const bundle = buildClinicalEncounterBundle({
                formData,
                patientId,
                practitionerId: user.id,
            })

            await executeClinicalEncounterTransaction(bundle)

            logSuccess(content.textToastSuccess, content.title)
            toast.success(content.textToastSuccess)
            form.reset(defaultValues)
            onSuccess?.()
        } catch (error) {
            logError(content.textToastFail, error, content.title)
            toast.error(content.textToastFail)
        }
    }

    return { form, onSubmit }
}
