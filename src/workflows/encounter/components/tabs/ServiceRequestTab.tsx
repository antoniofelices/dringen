// import type { Control } from 'react-hook-form'
import FormFieldTextarea from '@shared/components/ui/FormFieldTextarea'
import content from './ServiceRequestTab.content'
type Props = {
    control: null
}

const ServiceRequestTab = ({ control }: Props) => {
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

export default ServiceRequestTab
