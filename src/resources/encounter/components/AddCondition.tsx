import { useFieldArray } from 'react-hook-form'
import { CirclePlus, Trash2 } from 'lucide-react'
// import type { Control } from 'react-hook-form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldSelect from '@shared/components/ui/FormFieldSelect'
import { Button } from '@shared/components/ui/base/button'
import content from './AddCondition.content'

type Props = {
    control: null
}

const AddCondition = ({ control }: Props) => {
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
                    <FormFieldInput
                        className="w-full"
                        fieldName={`condition.${index}.cie10`}
                        label={content.labelCIE}
                        // control={control}
                        type="text"
                    />
                    <FormFieldInput
                        className="w-full"
                        fieldName={`condition.${index}.diagnosis`}
                        label={content.labelCondition}
                        // control={control}
                        type="text"
                    />
                    <FormFieldSelect
                        className="w-full"
                        // control={control}
                        fieldName={`condition.${index}.certainty`}
                        label={content.labelCertainty}
                        options={['suspected', 'probable', 'confirmed']}
                        placeholder={content.placeholderCertainty}
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

export default AddCondition
