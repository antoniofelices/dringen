import { useQuery } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'
import { getDiagnosis } from '@/services/supabaseService'
import Loading from '@components/ui/Loading'
import ErrorApi from '@components/ui/ErrorApi'

const Diagnosis = ({ id }: { id: string }) => {
    const {
        data: diagnosisData,
        isPending: diagnosisLoading,
        isError: diagnosisError,
        error: diagnosisErrorType,
    } = useQuery({
        queryKey: ['diagnosis', id],
        queryFn: () => getDiagnosis(id),
    })

    if (diagnosisLoading) return <Loading />

    if (diagnosisError && diagnosisErrorType)
        return <ErrorApi message={diagnosisErrorType.message} />

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
                {diagnosisData.medical_diagnosis.map((item) => (
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

export default Diagnosis
