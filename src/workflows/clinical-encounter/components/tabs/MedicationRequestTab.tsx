import FormFieldTextarea from '@shared/components/ui/FormFieldTextarea'
import type { TabProps } from '@workflows/clinical-encounter/types/clinicalEncounter.model'
import content from './MedicationRequestTab.content'

const MedicationRequestTab = ({ control }: TabProps) => {
    return (
        <>
            <FormFieldTextarea
                fieldName="treatment"
                label={content.labelTreatment}
                control={control}
            />
        </>
    )
}

export default MedicationRequestTab
