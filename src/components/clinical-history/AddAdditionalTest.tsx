import type { Control } from 'react-hook-form'
import type { ClinicalHistoryFormDataType } from '@/types/interfaces'
import FormFieldTextareaControl from '@components/ui/FormFieldTextareaControl'

type Props = {
    control: Control<ClinicalHistoryFormDataType>
}

const AdditionalTests = ({ control }: Props) => {
    return (
        <>
            <FormFieldTextareaControl
                fieldName="additional_tests"
                label="Additional tests"
                control={control}
            />
        </>
    )
}

export default AdditionalTests
