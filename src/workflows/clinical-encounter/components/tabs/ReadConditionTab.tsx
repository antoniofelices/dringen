import type { Condition } from '@medplum/fhirtypes'
import { ICD10_SYSTEM } from '@workflows/clinical-encounter/config/config'
import content from './ReadConditionTab.content'

const ReadConditionTab = ({ conditions }: { conditions: Condition[] }) => {
    if (conditions.length === 0) {
        return (
            <p className="text-sm text-gray-500">{content.textNoConditions}</p>
        )
    }

    return (
        <>
            {conditions.map((condition, index) => {
                const cie10 = condition.code?.coding?.find(
                    (c) => c.system === ICD10_SYSTEM
                )?.code
                const diagnosis = condition.code?.text
                const certainty =
                    condition.verificationStatus?.coding?.[0]?.code

                return (
                    <div
                        key={condition.id ?? index}
                        className="flex gap-4 justify-between items-center mt-4"
                    >
                        <div className="w-full">
                            <label className="text-sm font-medium">
                                {content.labelCIE}
                            </label>
                            <p className="text-sm mt-1">
                                {cie10 ?? content.textNoData}
                            </p>
                        </div>
                        <div className="w-full">
                            <label className="text-sm font-medium">
                                {content.labelCondition}
                            </label>
                            <p className="text-sm mt-1">
                                {diagnosis ?? content.textNoData}
                            </p>
                        </div>
                        <div className="w-full">
                            <label className="text-sm font-medium">
                                {content.labelCertainty}
                            </label>
                            <p className="text-sm mt-1">
                                {certainty ?? content.textNoData}
                            </p>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ReadConditionTab
