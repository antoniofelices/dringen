import { Fragment } from 'react'
import type { Control } from 'react-hook-form'
import type { ClinicalHistoryFormDataType } from '@/types/interfaces'
import FormFieldInput from '@/components/ui/FormFieldInput'

type Props = {
    control: Control<ClinicalHistoryFormDataType>
}

const AddExaminationData = ({ control }: Props) => {
    const fcInputs = [
        'temperature',
        'pas',
        'pad',
        'fc',
        'fr',
        'oximetry',
    ] as const
    const fbInputs = ['eating', 'thirst', 'urine', 'feces', 'sleep'] as const
    const nutritionIndicatorsInputs = [
        'person_weight',
        'person_height',
        'imc',
        'waist',
        'bfp',
        'mmp',
        'gfp',
    ] as const

    return (
        <div>
            <h4 className="text-xs mb-2 text-gray-500">FC</h4>
            <div className="flex gap-4 justify-between">
                {fcInputs.map((item) => {
                    return (
                        <Fragment key={item}>
                            <FormFieldInput
                                fieldName={item}
                                label={item}
                                control={control}
                                type="number"
                            />
                        </Fragment>
                    )
                })}
            </div>
            <h4 className="text-xs mb-2 text-gray-500">FB</h4>
            <div className="flex gap-4 justify-between">
                {fbInputs.map((item) => {
                    return (
                        <Fragment key={item}>
                            <FormFieldInput
                                fieldName={item}
                                label={item}
                                control={control}
                            />
                        </Fragment>
                    )
                })}
            </div>
            <h4 className="text-xs mb-2 text-gray-500">Nutrition indicators</h4>
            <div className="flex gap-4 justify-between">
                {nutritionIndicatorsInputs.map((item) => {
                    return (
                        <Fragment key={item}>
                            <FormFieldInput
                                fieldName={item}
                                label={item}
                                control={control}
                                type="number"
                            />
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default AddExaminationData
