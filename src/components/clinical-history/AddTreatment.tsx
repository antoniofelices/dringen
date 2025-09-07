import type { Control } from 'react-hook-form'
import type { ClinicalHistoryFormDataType } from '@/types/interfaces'
import FormFieldTextareaControl from '@components/ui/FormFieldTextareaControl'
import content from '@/config/data/clinical-history/displayClinicalHistory'

type Props = {
    control: Control<ClinicalHistoryFormDataType>
}

const AddTreatment = ({ control }: Props) => {
    return (
        <>
            <FormFieldTextareaControl
                fieldName="treatment"
                label={content.labelTreatment}
                control={control}
            />
        </>
    )
}

export default AddTreatment
