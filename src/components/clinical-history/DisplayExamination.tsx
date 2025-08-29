import type { ClinicalHistoryWithDiagnosis } from '@/types/interfaces'

const DisplayExamination = ({
    item,
}: {
    item: ClinicalHistoryWithDiagnosis
}) => {
    return (
        <div>
            <div>
                <h4 className="text-xs mb-2 text-gray-500">Explain</h4>
                <p>{item.examination}</p>
            </div>
            <div className="my-7">
                <h4 className="text-xs mb-2 text-gray-500">Mood</h4>
                <p>{item.mood}</p>
            </div>
            <div className="my-7">
                <h4 className="text-xs mb-2 text-gray-500">Exam</h4>
                <p>{item.test}</p>
            </div>
        </div>
    )
}

export default DisplayExamination
