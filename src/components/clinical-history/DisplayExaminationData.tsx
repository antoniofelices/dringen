import type { ClinicalHistoryWithDiagnosisType } from '@/types/interfaces'

const DisplayExaminationData = ({
    item,
}: {
    item: ClinicalHistoryWithDiagnosisType
}) => {
    return (
        <div>
            <div>
                <h4 className="text-xs mb-2 text-gray-500">FB</h4>
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3">Eating</th>
                            <th className="px-6 py-3">Thirst</th>
                            <th className="px-6 py-3">Urine</th>
                            <th className="px-6 py-3">Feces</th>
                            <th className="px-6 py-3">Sleep</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-x dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4">{item.eating}</td>
                            <td className="px-6 py-4">{item.thirst}</td>
                            <td className="px-6 py-4">{item.urine}</td>
                            <td className="px-6 py-4">{item.feces}</td>
                            <td className="px-6 py-4">{item.sleep}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="my-7">
                <h4 className="text-xs mb-2 text-gray-500">Vital functions</h4>
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3">T</th>
                            <th className="px-6 py-3">PAS</th>
                            <th className="px-6 py-3">PAD</th>
                            <th className="px-6 py-3">FC</th>
                            <th className="px-6 py-3">FR</th>
                            <th className="px-6 py-3">Oximetry</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-x dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4">
                                {item.temperature ? (
                                    <>{item.temperature}</>
                                ) : (
                                    <>0</>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.pas ? <>{item.pas}</> : <>0</>}
                            </td>
                            <td className="px-6 py-4">
                                {item.pad ? <>{item.pad}</> : <>0</>}
                            </td>
                            <td className="px-6 py-4">
                                {item.fc ? <>{item.fc}</> : <>0</>}
                            </td>
                            <td className="px-6 py-4">
                                {item.fr ? <>{item.fr}</> : <>0</>}
                            </td>
                            <td className="px-6 py-4">
                                {item.oximetry ? <>{item.oximetry}</> : <>0%</>}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="my-7">
                <h4 className="text-xs mb-2 text-gray-500">
                    Nutrition indicators
                </h4>
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3">Weight</th>
                            <th className="px-6 py-3">Height</th>
                            <th className="px-6 py-3">IMC</th>
                            <th className="px-6 py-3">Waist</th>
                            <th className="px-6 py-3">BFP</th>
                            <th className="px-6 py-3">MMP</th>
                            <th className="px-6 py-3">GFP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-x dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4">
                                {item.person_weight ? (
                                    <>{item.person_weight}</>
                                ) : (
                                    <>NaN</>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.person_height ? (
                                    <>{item.person_height}</>
                                ) : (
                                    <>NaN</>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.imc ? <>{item.imc}</> : <>NaN</>}
                            </td>
                            <td className="px-6 py-4">
                                {item.waist ? <>{item.waist}</> : <>NaN</>}
                            </td>
                            <td className="px-6 py-4">
                                {item.bfp ? <>{item.bfp}</> : <>NaN</>}
                            </td>
                            <td className="px-6 py-4">
                                {item.mmp ? <>{item.mmp}</> : <>NaN</>}
                            </td>
                            <td className="px-6 py-4">
                                {item.gfp ? <>{item.gfp}</> : <>NaN</>}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DisplayExaminationData
