// import type { Control } from 'react-hook-form'
import FormFieldTextarea from '@shared/components/ui/FormFieldTextarea'
import content from './AddServiceRequest.content'
type Props = {
    control: null
}

const AddServiceRequest = ({ control }: Props) => {
    return (
        <>
            <FormFieldTextarea
                fieldName="additional_tests"
                label={content.labelAdditionalTests}
                // control={control}
            />
        </>
    )
}

export default AddServiceRequest
