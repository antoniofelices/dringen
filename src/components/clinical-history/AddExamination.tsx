import type { Control } from 'react-hook-form'
import type { ClinicalHistoryFormDataType } from '@/types/interfaces'
import FormFieldInputControl from '@/components/ui/FormFieldInputControl'
import FormFieldTextareaControl from '@components/ui/FormFieldTextareaControl'
import FormFieldSelectControl from '../ui/FormFieldSelectControl'
type Props = {
    control: Control<ClinicalHistoryFormDataType>
}

const AddExamination = ({ control }: Props) => {
    return (
        <>
            <FormFieldSelectControl
                fieldName="type_of"
                label="Type of"
                control={control}
                options={['general', 'nutricional']}
            />
            <FormFieldTextareaControl
                fieldName="examination"
                label="Explain"
                control={control}
            />
            <FormFieldInputControl
                fieldName="mood"
                label="Mood"
                control={control}
            />
            <FormFieldInputControl
                fieldName="test"
                label="Test"
                control={control}
            />
        </>
    )
}

export default AddExamination
