import { useState } from 'react'
import { transformDate } from '@helpers/utils'

const Tabs = ({ content }) => {
    const [value, setValue] = useState()

    // const currentDisease = {
    //     examination: content.examination
    // }

    return (
        <>
            {content.hpi.map((item) => (
                <details key={item.id} className="my-5">
                    <summary>{transformDate(item.date_of)}</summary>
                    <div className="flex gap-4">
                        <div>
                            <button>Examinataion</button>
                            <div>
                                <h4 className="mt-4">Explain</h4>
                                <p>{item.examination}</p>
                                <h4 className="mt-4">Mood</h4>
                                <p>{item.mood}</p>
                                <h4 className="mt-4">FB</h4>
                                <h4 className="mt-4">Vital functions</h4>
                                <h4 className="mt-4">Nutrition indicators</h4>
                                <h4 className="mt-4">Exam</h4>
                            </div>
                        </div>
                        <div>
                            <button>Diagnosis</button>
                            <div></div>
                        </div>
                        <div>
                            <button>Auxiliary exams</button>
                            <p>{item.additional_tests}</p>
                        </div>
                        <div>
                            <button>Treatments</button>
                            <p>{item.treatment}</p>
                        </div>
                    </div>
                </details>
            ))}
        </>
    )
}

export default Tabs
