import type { ClinicalHistoryWithDiagnosisType } from '@/types/interfaces'
import content from '@data/clinical-history/displayExaminationData'

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
                            <th className="px-6 py-3">{content.textEating}</th>
                            <th className="px-6 py-3">{content.textThirst}</th>
                            <th className="px-6 py-3">{content.textUrine}</th>
                            <th className="px-6 py-3">{content.textFeces}</th>
                            <th className="px-6 py-3">{content.textSleep}</th>
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
                            <th className="px-6 py-3">{content.textT}</th>
                            <th className="px-6 py-3">{content.textPAS}</th>
                            <th className="px-6 py-3">{content.textPAD}</th>
                            <th className="px-6 py-3">{content.textFC}</th>
                            <th className="px-6 py-3">{content.textFR}</th>
                            <th className="px-6 py-3">
                                {content.textOximetry}
                            </th>
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
                            <th className="px-6 py-3">{content.textWeight}</th>
                            <th className="px-6 py-3">{content.textHeight}</th>
                            <th className="px-6 py-3">{content.textIMC}</th>
                            <th className="px-6 py-3">{content.textWaist}</th>
                            <th className="px-6 py-3">{content.textBFP}</th>
                            <th className="px-6 py-3">{content.textMMP}</th>
                            <th className="px-6 py-3">{content.textGFP}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-x dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4">
                                {item.person_weight ? (
                                    <>{item.person_weight}</>
                                ) : (
                                    <>{content.textNaN}</>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.person_height ? (
                                    <>{item.person_height}</>
                                ) : (
                                    <>{content.textNaN}</>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.imc ? (
                                    <>{item.imc}</>
                                ) : (
                                    <>{content.textNaN}</>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.waist ? (
                                    <>{item.waist}</>
                                ) : (
                                    <>{content.textNaN}</>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.bfp ? (
                                    <>{item.bfp}</>
                                ) : (
                                    <>{content.textNaN}</>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.mmp ? (
                                    <>{item.mmp}</>
                                ) : (
                                    <>{content.textNaN}</>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.gfp ? (
                                    <>{item.gfp}</>
                                ) : (
                                    <>{content.textNaN}</>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DisplayExaminationData
