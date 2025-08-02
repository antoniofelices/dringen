import { Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'

import Loading from '@components/base/Loading'
import ErrorApi from '@components/base/ErrorApi'
import { getDiagnosis } from '@/services/supabaseService'

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

    console.log(diagnosisData)

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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    {diagnosisData.dn_hpi_diagnosis.map((item) => (
                        <Fragment key={uuidv4()}>
                            <td className="px-6 py-4">{item.cie10}</td>
                            <td className="px-6 py-4">{item.diagnosis}</td>
                            <td className="px-6 py-4">{item.certainty}</td>
                        </Fragment>
                    ))}
                </tr>
            </tbody>
        </table>
    )
}

export default Diagnosis
