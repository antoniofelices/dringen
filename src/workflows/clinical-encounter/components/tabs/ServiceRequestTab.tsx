import FormFieldTextarea from '@shared/components/ui/FormFieldTextarea'
import type { TabProps } from '@workflows/clinical-encounter/types/clinicalEncounter.model'
import content from './ServiceRequestTab.content'

const ServiceRequestTab = ({ control }: TabProps) => {
    return (
        <>
            <FormFieldTextarea
                fieldName="additional_tests"
                label={content.labelAdditionalTests}
                control={control}
            />
        </>
    )
}

export default ServiceRequestTab
