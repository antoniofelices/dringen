import { v4 as uuidv4 } from 'uuid'
import type { ClinicalHistoryWithDiagnosis } from '@/types/interfaces'

const DisplayDiagnosis = ({ item }: { item: ClinicalHistoryWithDiagnosis }) => {
    return (
        <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs bg-gray-200 dark:bg-gray-700">
                <tr>
                    <th className="px-6 py-3">CIE10</th>
                    <th className="px-6 py-3">Diagnosis</th>
                    <th className="px-6 py-3">Certainty</th>
                </tr>
            </thead>
            <tbody>
                {item.medical_diagnosis.map((item) => (
                    <tr
                        className="bg-white border-b border-x dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                        key={uuidv4()}
                    >
                        <td className="px-6 py-4">{item.cie10}</td>
                        <td className="px-6 py-4">{item.diagnosis}</td>
                        <td className="px-6 py-4">{item.certainty}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default DisplayDiagnosis
