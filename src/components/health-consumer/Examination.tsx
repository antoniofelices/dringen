const Examination = ({ content }) => {
    return (
        <div>
            <div className="mt-4">
                <h4>Explain</h4>
                <p>{content.examination}</p>
            </div>
            <div className="mt-4">
                <h4>Mood</h4>
                <p>{content.mood}</p>
            </div>
            <div className="mt-4">
                <h4>Exam</h4>
                <p>{content.test}</p>
            </div>
            <div className="mt-4">
                <h4>FB</h4>
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
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4">{content.eating}</td>
                            <td className="px-6 py-4">{content.thirst}</td>
                            <td className="px-6 py-4">{content.urine}</td>
                            <td className="px-6 py-4">{content.feces}</td>
                            <td className="px-6 py-4">{content.sleep}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <h4>Vital functions</h4>
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
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4">
                                {content.heat ? <>{content.heat}</> : <>0</>}
                            </td>
                            <td className="px-6 py-4">
                                {content.pas ? <>{content.pas}</> : <>0</>}
                            </td>
                            <td className="px-6 py-4">
                                {content.pad ? <>{content.pad}</> : <>0</>}
                            </td>
                            <td className="px-6 py-4">
                                {content.fc ? <>{content.fc}</> : <>0</>}
                            </td>
                            <td className="px-6 py-4">
                                {content.fr ? <>{content.fr}</> : <>0</>}
                            </td>
                            <td className="px-6 py-4">
                                {content.oximetry ? (
                                    <>{content.oximetry}</>
                                ) : (
                                    <>0%</>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <h4>Nutrition indicators</h4>
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
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4">
                                {content.person_weight ? (
                                    <>{content.person_weight}</>
                                ) : (
                                    <>NaN</>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {content.person_height ? (
                                    <>{content.person_height}</>
                                ) : (
                                    <>NaN</>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {content.imc ? <>{content.imc}</> : <>NaN</>}
                            </td>
                            <td className="px-6 py-4">
                                {content.waist ? (
                                    <>{content.waist}</>
                                ) : (
                                    <>NaN</>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {content.bfp ? <>{content.bfp}</> : <>NaN</>}
                            </td>
                            <td className="px-6 py-4">
                                {content.mmp ? <>{content.mmp}</> : <>NaN</>}
                            </td>
                            <td className="px-6 py-4">
                                {content.gfp ? <>{content.gfp}</> : <>NaN</>}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Examination
