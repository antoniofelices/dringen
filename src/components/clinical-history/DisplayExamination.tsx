// import { usePatientContext } from '@/hooks/usePatientContext'

const DisplayExamination = ({ content }) => {
    // const dataUser = usePatientContext()
    // console.log(dataUser.calar)

    return (
        <div>
            <div>
                <h4 className="text-xs mb-2 text-gray-500">Explain</h4>
                <p>{content.examination}</p>
            </div>
            <div className="my-7">
                <h4 className="text-xs mb-2 text-gray-500">Mood</h4>
                <p>{content.mood}</p>
            </div>
            <div className="my-7">
                <h4 className="text-xs mb-2 text-gray-500">Exam</h4>
                <p>{content.test}</p>
            </div>
        </div>
    )
}

export default DisplayExamination
