import FormFieldTextarea from '@shared/components/ui/FormFieldTextarea'
import type { TabPropsType } from '@workflows/clinical-encounter/types/clinicalEncounter.model'
import content from './ServiceRequestTab.content'

const ServiceRequestTab = ({ control }: TabPropsType) => {
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
