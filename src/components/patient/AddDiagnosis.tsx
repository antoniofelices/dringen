import { useState } from 'react'
import { CirclePlus } from 'lucide-react'
import FormFieldInput from '@/components/ui/FormFieldInput'

const AddDiagnosis = ({ register, errors }) => {
    const [addDiagnosis, setAddDiagnosis] = useState([1])

    const NewDiagnosis = () => {
        return (
            <div className="flex gap-4 justify-between items-center mt-4">
                <FormFieldInput
                    className="w-full"
                    errors={errors}
                    fieldName="cie10"
                    label="CIE10"
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    className="w-full"
                    errors={errors}
                    fieldName="diagnosis"
                    label="Diagnosis"
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    className="w-full"
                    errors={errors}
                    fieldName="certainty"
                    label="Certainty"
                    register={register}
                    type="text"
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
