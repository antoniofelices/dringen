import type { Control } from 'react-hook-form'
import type { ClinicalHistoryFormDataType } from '@/types/interfaces'
import FormFieldInputControl from '@/components/ui/FormFieldInputControl'
import FormFieldTextareaControl from '@components/ui/FormFieldTextareaControl'
import FormFieldSelectControl from '../ui/FormFieldSelectControl'
import content from '@data/clinical-history/addExamination'

type Props = {
    control: Control<ClinicalHistoryFormDataType>
}

const AddExamination = ({ control }: Props) => {
    return (
        <>
            <FormFieldSelectControl
                fieldName="type_of"
                label={content.labelType}
                control={control}
                options={['general', 'nutricional']}
            />
            <FormFieldTextareaControl
                fieldName="examination"
                label={content.labelExplain}
                control={control}
            />
            <FormFieldInputControl
                fieldName="mood"
                label={content.labelMood}
                control={control}
            />
            <FormFieldInputControl
                fieldName="test"
                label={content.labelTest}
                control={control}
            />
        </>
    )
}

export default AddExamination
