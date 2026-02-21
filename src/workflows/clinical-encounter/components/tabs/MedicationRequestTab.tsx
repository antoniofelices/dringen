// import type { Control } from 'react-hook-form'
import FormFieldTextarea from '@shared/components/ui/FormFieldTextarea'
import content from './MedicationRequestTab.content'

type Props = {
    control: null
}

const MedicationRequestTab = ({ control }: Props) => {
    return (
        <>
            <FormFieldTextarea
                fieldName="treatment"
                label={content.labelTreatment}
                // control={control}
            />
        </>
    )
}

export default MedicationRequestTab
