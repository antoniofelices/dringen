// import type { Control } from 'react-hook-form'
import { Fragment } from 'react'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldTextarea from '@shared/components/ui/FormFieldTextarea'
import content from './ObservationTab.content'

const ObservationTab = () => {
    const fcInputs = [
        'temperature',
        'pas',
        'pad',
        'fc',
        'fr',
        'oximetry',
    ] as const
    const fbInputs = [
        'eating',
        'thirst',
        'urine',
        'feces',
        'sleep',
        'mood',
    ] as const

    return (
        <>
            <FormFieldTextarea
                fieldName="description"
                label={content.labelDescription}
                type="text"
                // control={control}
            />
            <h4 className="text-xs mb-2 text-gray-500">
                {content.textGeneral}
            </h4>
            <div className="flex gap-4 justify-between">
                <FormFieldInput
                    fieldName="examination"
                    label={content.labelExamination}
                    type="text"
                    className="w-full"
                    // control={control}
                />
                <div className="flex gap-4 justify-between">
                    <FormFieldInput
                        fieldName="person_weight"
                        label={content.labelWeight}
                        type="number"
                        // control={control}
                    />
                    <FormFieldInput
                        fieldName="person_height"
                        label={content.labelHeight}
                        type="number"
                        // control={control}
                    />
                </div>
            </div>
            <h4 className="text-xs mb-2 text-gray-500">{content.textVitals}</h4>
            <div className="flex gap-4 justify-between">
                {fcInputs.map((item) => {
                    return (
                        <Fragment key={item}>
                            <FormFieldInput
                                fieldName={item}
                                label={item}
                                // control={control}
                                type="number"
                            />
                        </Fragment>
                    )
                })}
            </div>
            <h4 className="text-xs mb-2 text-gray-500">
                {content.textBiologicalBasic}
            </h4>
            <div className="flex gap-4 justify-between">
                {fbInputs.map((item) => {
                    return (
                        <Fragment key={item}>
                            <FormFieldInput
                                fieldName={item}
                                label={item}
                                // control={control}
                            />
                        </Fragment>
                    )
                })}
            </div>
        </>
    )
}

export default ObservationTab
