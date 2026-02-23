import type { Observation } from '@medplum/fhirtypes'
import {
    OBSERVATION_FIELDS,
    BIOLOGICAL_FIELDS,
} from '@workflows/clinical-encounter/config/config'
import content from './ReadObservationTab.content'

type Props = {
    observations: Observation[]
}

const findObservationByCode = (observations: Observation[], code: string) =>
    observations.find((o) => o.code?.coding?.[0]?.code === code)

const ReadObservationTab = ({ observations }: Props) => {
    const description = findObservationByCode(observations, '404684003')
    const examination = findObservationByCode(observations, '29545-1')

    const numericFields = Object.entries(OBSERVATION_FIELDS) as Array<
        [string, (typeof OBSERVATION_FIELDS)[keyof typeof OBSERVATION_FIELDS]]
    >
    const bioFields = Object.entries(BIOLOGICAL_FIELDS) as Array<
        [string, (typeof BIOLOGICAL_FIELDS)[keyof typeof BIOLOGICAL_FIELDS]]
    >

    return (
        <>
            <div className="mb-4">
                <label className="text-sm font-medium">
                    {content.labelDescription}
                </label>
                <p className="text-sm mt-1">
                    {description?.valueString ?? content.textNoData}
                </p>
            </div>

            <h4 className="text-xs mb-2 text-gray-500">
                {content.textGeneral}
            </h4>
            <div className="flex gap-4 justify-between mb-4">
                <div className="w-full">
                    <label className="text-sm font-medium">
                        {content.labelExamination}
                    </label>
                    <p className="text-sm mt-1">
                        {examination?.valueString ?? content.textNoData}
                    </p>
                </div>
                <div className="flex gap-4">
                    <div>
                        <label className="text-sm font-medium">
                            {content.labelWeight}
                        </label>
                        <p className="text-sm mt-1">
                            {findObservationByCode(observations, '29463-7')
                                ?.valueQuantity?.value ?? content.textNoData}
                        </p>
                    </div>
                    <div>
                        <label className="text-sm font-medium">
                            {content.labelHeight}
                        </label>
                        <p className="text-sm mt-1">
                            {findObservationByCode(observations, '8302-2')
                                ?.valueQuantity?.value ?? content.textNoData}
                        </p>
                    </div>
                </div>
            </div>

            <h4 className="text-xs mb-2 text-gray-500">
                {content.textVitals}
            </h4>
            <div className="flex gap-4 justify-between mb-4">
                {numericFields
                    .filter(
                        ([key]) =>
                            key !== 'person_weight' && key !== 'person_height'
                    )
                    .map(([key, meta]) => {
                        const obs = findObservationByCode(
                            observations,
                            meta.code
                        )
                        return (
                            <div key={key}>
                                <label className="text-sm font-medium">
                                    {meta.display}
                                </label>
                                <p className="text-sm mt-1">
                                    {obs?.valueQuantity?.value ??
                                        content.textNoData}
                                </p>
                            </div>
                        )
                    })}
            </div>

            <h4 className="text-xs mb-2 text-gray-500">
                {content.textBiologicalBasic}
            </h4>
            <div className="flex gap-4 justify-between">
                {bioFields.map(([key, meta]) => {
                    const obs = findObservationByCode(observations, meta.code)
                    return (
                        <div key={key}>
                            <label className="text-sm font-medium">
                                {meta.display}
                            </label>
                            <p className="text-sm mt-1">
                                {obs?.valueString ?? content.textNoData}
                            </p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ReadObservationTab
