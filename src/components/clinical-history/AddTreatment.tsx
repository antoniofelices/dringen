import type { Control } from 'react-hook-form'
import type { ClinicalHistoryFormDataType } from '@/types/interfaces'
import FormFieldTextareaControl from '@components/ui/FormFieldTextareaControl'

type Props = {
    control: Control<ClinicalHistoryFormDataType>
}

const AddTreatment = ({ control }: Props) => {
    return (
        <>
            <FormFieldTextareaControl
                fieldName="treatment"
                label="Treatment"
                control={control}
            />
        </>
    )
}

export default AddTreatment
