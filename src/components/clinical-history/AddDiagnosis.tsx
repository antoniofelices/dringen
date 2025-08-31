import { useFieldArray } from 'react-hook-form'
import { CirclePlus, Trash2 } from 'lucide-react'
import type { Control } from 'react-hook-form'
import type { ClinicalHistoryFormDataType } from '@/types/interfaces'
import FormFieldInputControl from '@/components/ui/FormFieldInputControl'
import FormFieldSelectControl from '@/components/ui/FormFieldSelectControl'
import { Button } from '@components/ui/base/button'
import { DIAGNOSISCERTAINTYVALUES } from '@/config/config.ts'
type Props = {
    control: Control<ClinicalHistoryFormDataType>
}

const AddDiagnosis = ({ control }: Props) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'diagnoses',
    })

    const addDiagnosisHandler = () => {
        append({
            cie10: '',
            diagnosis: '',
            certainty: 'suspected',
        })
    }

    const removeDiagnosisHandler = (index: number) => {
        if (fields.length > 1) {
            remove(index)
        }
    }

    if (fields.length === 0) {
        append({
            cie10: '',
            diagnosis: '',
            certainty: 'suspected',
        })
    }

    return (
        <>
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="flex gap-4 justify-between items-center mt-4"
                >
                    <FormFieldInputControl
                        className="w-full"
                        fieldName={`diagnoses.${index}.cie10`}
                        label="CIE10"
                        control={control}
                        type="text"
                    />
                    <FormFieldInputControl
                        className="w-full"
                        fieldName={`diagnoses.${index}.diagnosis`}
                        label="Diagnosis"
                        control={control}
                        type="text"
                    />
                    <FormFieldSelectControl
                        className="w-full"
                        control={control}
                        fieldName={`diagnoses.${index}.certainty`}
                        label="Certainty"
                        options={DIAGNOSISCERTAINTYVALUES}
                        placeholder="Select certainty"
                    />
                    <div className="flex items-center gap-2 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addDiagnosisHandler}
                        >
                            <CirclePlus size={16} />
                        </Button>
                        {fields.length > 1 && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeDiagnosisHandler(index)}
                            >
                                <Trash2 size={16} />
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}

export default AddDiagnosis
