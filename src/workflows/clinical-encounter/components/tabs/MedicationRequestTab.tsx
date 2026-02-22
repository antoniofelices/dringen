import FormFieldTextarea from '@shared/components/ui/FormFieldTextarea'
import type { TabPropsType } from '@workflows/clinical-encounter/types/clinicalEncounter.model'
import content from './MedicationRequestTab.content'

const MedicationRequestTab = ({ control }: TabPropsType) => {
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
