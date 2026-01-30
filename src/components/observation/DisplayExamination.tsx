import type { ClinicalHistoryWithDiagnosisType } from '@/types/interfaces'
import content from '@data/clinical-history/displayExamination'

const DisplayExamination = ({
    item,
}: {
    item: ClinicalHistoryWithDiagnosisType
}) => {
    return (
        <div>
            <div>
                <h4 className="text-xs mb-2 text-gray-500">
                    {content.textExplain}
                </h4>
                <p>{item.examination}</p>
            </div>
            <div className="my-7">
                <h4 className="text-xs mb-2 text-gray-500">
                    {content.textMoon}
                </h4>
                <p>{item.mood}</p>
            </div>
            <div className="my-7">
                <h4 className="text-xs mb-2 text-gray-500">
                    {content.textExam}
                </h4>
                <p>{item.test}</p>
            </div>
        </div>
    )
}

export default DisplayExamination
