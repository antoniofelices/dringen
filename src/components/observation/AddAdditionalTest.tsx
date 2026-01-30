import type { Control } from 'react-hook-form'
import type { ClinicalHistoryFormDataType } from '@/types/interfaces'
import FormFieldTextarea from '@/components/ui/FormFieldTextarea'

type Props = {
    control: Control<ClinicalHistoryFormDataType>
}

const AdditionalTests = ({ control }: Props) => {
    return (
        <>
            <FormFieldTextarea
                fieldName="additional_tests"
                label="Additional tests"
                control={control}
            />
        </>
    )
}

export default AdditionalTests
