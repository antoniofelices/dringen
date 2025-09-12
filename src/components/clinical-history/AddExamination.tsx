import type { Control } from 'react-hook-form'
import type { ClinicalHistoryFormDataType } from '@/types/interfaces'
import FormFieldInput from '@/components/ui/FormFieldInput'
import FormFieldTextarea from '@/components/ui/FormFieldTextarea'
import FormFieldSelect from '../ui/FormFieldSelect'
import content from '@data/clinical-history/addExamination'

type Props = {
    control: Control<ClinicalHistoryFormDataType>
}

const AddExamination = ({ control }: Props) => {
    return (
        <>
            <FormFieldSelect
                fieldName="type_of"
                label={content.labelType}
                control={control}
                options={['general', 'nutricional']}
            />
            <FormFieldTextarea
                fieldName="examination"
                label={content.labelExplain}
                control={control}
            />
            <FormFieldInput
                fieldName="mood"
                label={content.labelMood}
                control={control}
            />
            <FormFieldInput
                fieldName="test"
                label={content.labelTest}
                control={control}
            />
        </>
    )
}

export default AddExamination
