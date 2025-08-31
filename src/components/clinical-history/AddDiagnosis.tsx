import { useState } from 'react'
import { CirclePlus } from 'lucide-react'
import type { Control } from 'react-hook-form'
import type { ClinicalHistoryFormDataType } from '@/types/interfaces'
import FormFieldInputControl from '@/components/ui/FormFieldInputControl'
import FormFieldSelectControl from '@/components/ui/FormFieldSelectControl'

type Props = {
    control: Control<ClinicalHistoryFormDataType>
}

const AddDiagnosis = ({ control }: Props) => {
    const [addDiagnosis, setAddDiagnosis] = useState([1])

    const NewDiagnosis = () => {
        return (
            <div className="flex gap-4 justify-between items-center mt-4">
                <FormFieldInputControl
                    className="w-full"
                    fieldName="cie10"
                    label="CIE10"
                    control={control}
                    type="text"
                />
                <FormFieldInputControl
                    className="w-full"
                    fieldName="diagnosis"
                    label="Diagnosis"
                    control={control}
                    type="text"
                />
                <FormFieldSelectControl
                    className="w-full"
                    control={control}
                    fieldName="certainty"
                    label="Certainty"
                    options={['confirmed', 'probable', 'suspected']}
                    placeholder="User"
                />
                <button onClick={addDiagnosisHandler}>
                    <CirclePlus size={20} />
                </button>
            </div>
        )
    }

    const addDiagnosisHandler = () => {
        setAddDiagnosis((prev) => [...prev, prev.length + 1])
    }

    return (
        <>
            {addDiagnosis.map((singleId) => (
                <div key={singleId} id={`diagnosis-${singleId}`}>
                    <NewDiagnosis />
                </div>
            ))}
        </>
    )
}

export default AddDiagnosis
